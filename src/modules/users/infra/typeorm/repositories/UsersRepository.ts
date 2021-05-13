import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IIinsertPivotTableCommunications } from "@modules/users/dtos/IInsertPivotTableCommunications";
import { IInsertPivotTableSkills } from "@modules/users/dtos/IInsertPivotTableSkills";
import { IRequestMentoringByUser } from "@modules/users/dtos/IRequestMentoringByUser";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { Skill } from "../entities/Skill";
import { User } from "../entities/User";

class UsersRepository implements IUserRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }
   
    async create({
        id, 
        first_name, 
        last_name, email, 
        password, is_mentor, 
        info_mentor, avatar, 
        communications, 
        skills, stars, 
        total_evaluations}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            id,
            first_name,
            last_name,
            email,
            password,
            is_mentor,
            info_mentor,
            avatar,
            stars,
            total_evaluations
        })
        return await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email})
    }

    async insertPivotTableSkills({skill_id, user_id}: IInsertPivotTableSkills): Promise<void> {
        return await this.repository.query(`
            INSERT INTO users_skills(user_id, skill_id)
            VALUES($1, $2)
        `, [user_id, skill_id])
    }

    async insertPivotTableCommunications({ user_id, communication_id }: IIinsertPivotTableCommunications): Promise<void> {
        return await this.repository.query(`
            INSERT INTO mentors_communications(mentor_id, communication_id)
            VALUES ($1, $2)
        `, [user_id, communication_id])
    }

    async profile(id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {id},
            relations: ['skills', 'communications', 'mentors_availabilities', 'comments'],
        })
        
        return user;
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne({id})
    }   

    async findMentor(skills_id: Skill[]): Promise<User[]> {
        /*const mentors = this.repository.find({
            join: {
                alias: "users",
                leftJoinAndSelect: {
                    skill: "users.skills",
                }
            },
            where: {
                is_mentor: true,            
            },
          
        })*/

        const mentors = await this.repository
            .createQueryBuilder("users")
            .leftJoinAndSelect('users.skills', 'skill')
            .leftJoinAndSelect('users.communications', 'communication')
            .where("is_mentor = true")
            .andWhere("skill.id IN (:...ids)", { ids: skills_id })
            .select(['users.avatar','users.first_name','skill.name', 'communication.name', 'users.stars'])
            .getMany()

            //https://stackoverflow.com/questions/39011593/postgresql-get-matched-value-of-array-field-in-the-result

            /*const mentors = await this.repository.query(`
                SELECT users.*, skills.* from users
                INNER JOIN skills ON users.skill_id = skills.user_id
                WHERE ARRAY [$1]::varchar[]
            `, [skills_id])*/

        return mentors;
    }

    async findSkills(id: string): Promise<Skill[]> {
        const skills = await this.repository
            .createQueryBuilder("users")
            .leftJoinAndSelect('users.skills', 'skill')
            .where('users.id = :id', { id })
            .select(['skill.id', 'skill.name'])
            .getRawMany()

        return skills
    }

    async requestMentoringByUser(mentor_id: string): Promise<IRequestMentoringByUser> {
        const mentor = await this.repository
            .createQueryBuilder("users")
            .leftJoinAndSelect("users.communications", 'communication')
            .leftJoinAndSelect("users.mentors_availabilities", 'mentors_availabilities')
            .leftJoinAndSelect("users.comments", 'comments')
            .where('users.id = :id', { id: mentor_id })
            .select([
                "users.id", "users.first_name", "users.last_name", 
                "users.avatar", "users.info_mentor", 
                "users.is_mentor", "communication",
                "mentors_availabilities.id", "mentors_availabilities.start_date",
                "mentors_availabilities.end_date", "comments.id", "comments.comment",
                "comments.comment_star"
            ])
            .getOne();

        const mentorTotalMentoring = await this.repository.query(`
            SELECT count('isDone') as total_mentoring from mentoring 
            WHERE mentor_id=$1
        `, [mentor_id])

        return {
            mentor,
            mentorTotalMentoring
        };
    }
}

export { UsersRepository }
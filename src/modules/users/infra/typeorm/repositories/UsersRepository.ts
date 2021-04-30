import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IIinsertPivotTableCommunications } from "@modules/users/dtos/IInsertPivotTableCommunications";
import { IInsertPivotTableSkills } from "@modules/users/dtos/IInsertPivotTableSkills";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";


class UsersRepository implements IUserRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }
    
    async create({id, 
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
            stars
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
            relations: ['skills', 'communications', 'mentors_availabilities']
        })
        
        return user
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne({id})
    }   
}

export { UsersRepository }
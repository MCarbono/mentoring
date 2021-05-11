import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IIinsertPivotTableCommunications } from "@modules/users/dtos/IInsertPivotTableCommunications";
import { IInsertPivotTableSkills } from "@modules/users/dtos/IInsertPivotTableSkills";
import { IRequestMentoringByUser } from "@modules/users/dtos/IRequestMentoringByUser";
import { Skill } from "@modules/users/infra/typeorm/entities/Skill";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";


class UsersRepositoryInMemomy implements IUserRepository{

    users: User[] = [];

    //pivot skills
    usersSkills: string[] = [];

    create({ id, first_name, last_name, email, password, is_mentor, total_evaluations, stars }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            first_name,
            last_name,
            email,
            password,
            is_mentor,
            total_evaluations,
            stars
        })

        this.users.push(user);
        return
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }

    async insertPivotTableSkills({ user_id, skill_id }: IInsertPivotTableSkills): Promise<void> {
       this.usersSkills.push(user_id, skill_id)
    }

    insertPivotTableCommunications({ user_id, communication_id }: IIinsertPivotTableCommunications): Promise<void> {
        throw new Error("Method not implemented.");
    }
    profile(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findMentor(skills_id: Skill[]): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findSkills(id: string): Promise<Skill[]> {
        throw new Error("Method not implemented.");
    }
    requestMentoringByUser(mentor_id: string): Promise<IRequestMentoringByUser> {
        throw new Error("Method not implemented.");
    }

}

export { UsersRepositoryInMemomy }
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IIinsertPivotTableCommunications } from "../dtos/IInsertPivotTableCommunications";
import { IInsertPivotTableSkills } from "../dtos/IInsertPivotTableSkills";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>
    findByEmail(email: string): Promise<User>
    insertPivotTableSkills({user_id, skill_id}: IInsertPivotTableSkills): Promise<void>
    insertPivotTableCommunications({user_id, communication_id}: IIinsertPivotTableCommunications): Promise<void>
    profile(id: string): Promise<User>
    findById(id: string): Promise<User>
    findMentor(skills_id: string[]): Promise<User>
}

export { IUserRepository }
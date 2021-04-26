import { ICreateSkillDTO } from "../dtos/ICreateSkillDTO";
import { Skill } from "../infra/typeorm/entities/Skill";

interface ISkillsRepository {
    create(data: ICreateSkillDTO): Promise<void>
    findByName(name: string): Promise<Skill>
}

export { ISkillsRepository }
import { ICreateSkillDTO } from "../dtos/ICreateSkillDTO";
import { Skill } from "../infra/typeorm/entities/Skill";

interface ISkillsRepository {
    create(data: ICreateSkillDTO): Promise<void>
    findByName(name: string): Promise<Skill>
    findByIds(skills_id: Skill[]): Promise<Skill[]>
}

export { ISkillsRepository }
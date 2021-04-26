import { ICreateSkillDTO } from "@modules/users/dtos/ICreateSkillDTO";
import { ISkillsRepository } from "@modules/users/repositories/ISkillsRepository";
import { getRepository, Repository } from "typeorm";
import { Skill } from "../entities/Skill";


class SkillsRepository implements ISkillsRepository {
    private repository: Repository<Skill>
    
    constructor(){
        this.repository = getRepository(Skill)
    }
 
    async create({name}: ICreateSkillDTO): Promise<void> {
        const skill = this.repository.create({
            name
        })

        await this.repository.save(skill)   
    }

    async findByName(name: string): Promise<Skill> {
        const skill = await this.repository.findOne({ name })

        return skill
    }

}

export { SkillsRepository }
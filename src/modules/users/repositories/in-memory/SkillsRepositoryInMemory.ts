import { ICreateSkillDTO } from "@modules/users/dtos/ICreateSkillDTO";
import { Skill } from "@modules/users/infra/typeorm/entities/Skill";
import { ISkillsRepository } from "../ISkillsRepository";


class SkillsRepositoryInMemory implements ISkillsRepository{

    skills: Skill[] = [];

    async createMemory(name: string): Promise<Skill> {
        const skill = new Skill()

        Object.assign(skill, {
            name
        })

        this.skills.push(skill);

        return skill;
    }

    async findByName(name: string): Promise<Skill> {
        return this.skills.find(skill => skill.name === name)
    }

    async findByIds(skills_id: Skill[]): Promise<Skill[]> {
       const teste: Skill[] = []
       for(let skills_db of this.skills){
           for(let skills of skills_id){
               if(skills.id === skills_db.id){
                   teste.push(skills)
               }
           }
       }
       
       return teste;
        
    }

    create(data: ICreateSkillDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { SkillsRepositoryInMemory }
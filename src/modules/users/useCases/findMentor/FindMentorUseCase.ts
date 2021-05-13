
import { Skill } from "@modules/users/infra/typeorm/entities/Skill";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { ISkillsRepository } from "@modules/users/repositories/ISkillsRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindMentorUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("SkillsRepository")
        private skillsRepository: ISkillsRepository,
    ){}
    async execute(skills_id: Skill[]): Promise<User[]>{
        const skills = await this.skillsRepository.findByIds(skills_id)

        if(skills.length !== skills_id.length){
            throw new AppError("One or more skills was not found!")
        }

        const mentors = await this.usersRepository.findMentor(skills_id)
        
        return mentors;
    }
}

export { FindMentorUseCase }
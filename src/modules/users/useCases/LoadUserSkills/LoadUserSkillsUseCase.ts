import { Skill } from "@modules/users/infra/typeorm/entities/Skill";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class LoadUserSkillsUseCase {   

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

    ){}
    async execute(id: string): Promise<Skill[]>{
        const userSkills = await this.usersRepository.findSkills(id)
        return userSkills;
    }
}

export { LoadUserSkillsUseCase }
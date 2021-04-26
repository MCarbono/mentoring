import { ISkillsRepository } from "@modules/users/repositories/ISkillsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSkillUseCase {
    constructor(
        @inject("SkillsRepository")
        private skillRepository: ISkillsRepository
    ){}

    async execute(name: string): Promise<void>{
        const skillExists = await this.skillRepository.findByName(name)

        if(skillExists)
            throw new AppError("Skill already exists!")

        await this.skillRepository.create({
            name
        })
    }
}

export { CreateSkillUseCase }
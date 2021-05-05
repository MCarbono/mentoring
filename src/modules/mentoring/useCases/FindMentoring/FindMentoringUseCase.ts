import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class FindMentoringUseCase {

    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("UsersRepository")
        private usersRepository: IUserRepository

    ){}

    async execute(is_mentor: boolean, id: string): Promise<Mentoring[]>{
        
        const user = await this.usersRepository.findById(id)
        
        if(!user){
            throw new AppError("User does not exists");
        }
        
        if(is_mentor){
            return await this.mentoringRepository.findMentoringByMentor(id);
            
        }
        
        return await this.mentoringRepository.findMentoringByUser(id); 
    }
}

export { FindMentoringUseCase }
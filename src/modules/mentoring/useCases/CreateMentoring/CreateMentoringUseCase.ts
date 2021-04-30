import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IMentorsAvailabilityRepository } from "@modules/users/repositories/IMentorsAvailabilityRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    mentor_id: string;
    user_id: string;
    mentor_availability_id: string;
    subject: string;
}

@injectable()
class CreateMentoringUseCase {
    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("MentorsAvailabilitiesRepository")
        private mentorsAvailabilitiesRepository: IMentorsAvailabilityRepository

    ){}

    async execute({ mentor_id, user_id, mentor_availability_id, subject }:IRequest): Promise<void>{
        const mentor = await this.usersRepository.findById(mentor_id)

        if(!mentor){
            throw new AppError("Mentor does not exists")
        }
        
        if(!mentor.is_mentor)
            throw new AppError("User mentor selected is not a mentor")

        //mentor_availability_id verification
        

        await this.mentoringRepository.create({
            mentor_availability_id,
            mentor_id,
            subject,
            user_id
        })

    }
}

export { CreateMentoringUseCase }
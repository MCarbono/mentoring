import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { resolve } from 'path';

interface IRequest {
    mentor_id: string;
    user_id: string;
    mentor_availability_id: string;
    subject: string;
    communication: string;
}

@injectable()
class CreateMentoringUseCase {
    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
    ){}

    async execute({ mentor_id, user_id, mentor_availability_id, subject, communication }:IRequest): Promise<void>{
        const mentor = await this.usersRepository.findById(mentor_id)
        const emailPath = resolve(__dirname, "..", "..", "views", "emails", "requestedMentoring.hbs")
        
        if(!mentor){
            throw new AppError("Mentor does not exists")
        }
        
        if(!mentor.is_mentor)
            throw new AppError("User mentor selected is not a mentor")

        const mentoringAlreadyRegistered = await this.mentoringRepository.findByIdMentorAvailability(mentor_availability_id)

        if(mentoringAlreadyRegistered){
            throw new AppError("Mentoring is already registered. Wait for mentor's approvement")
        }

        await this.mentoringRepository.create({
            mentor_availability_id,
            mentor_id,
            subject,
            user_id,
            communication
        })

        const variables = {
            name: mentor.first_name
        }

        await this.mailProvider.sendMail(
            mentor.email,
            "Solicitação de mentoria",
            variables,
            emailPath
        )

    }
}

export { CreateMentoringUseCase }
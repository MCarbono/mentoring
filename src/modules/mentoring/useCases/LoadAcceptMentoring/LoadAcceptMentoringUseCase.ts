import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class LoadAcceptMentoringUseCase {

    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute(mentoring_id: string, mentor_id: string, user_id: string): Promise<Mentoring>{
        const mentorAndMentoring = await this.mentoringRepository.findMentoringMentorUser(
            mentoring_id,
            mentor_id,
            user_id
        )
        
        if(!mentorAndMentoring){
            throw new AppError("Mentoring not found", 404)
        }

        const limitDate = this.dateProvider.limitToAcceptMentoring(mentorAndMentoring.mentors_availability.start_date, 3)
        
        if(this.dateProvider.dateNow() > limitDate){
            throw new AppError("You cannot accept a mentoring at this point. Mentoring Expired")
        }
            
        if(mentorAndMentoring.accepted)
            throw new AppError("Mentoring is already accepted");

        
        return mentorAndMentoring;
    }

}

export { LoadAcceptMentoringUseCase }
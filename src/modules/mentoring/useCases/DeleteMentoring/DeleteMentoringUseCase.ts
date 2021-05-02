import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

interface IRequest {
    mentoring_id: string;
    mentor_id: string;
    refused_info: string;
}

@injectable()
class DeleteMentoringUseCase {

    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute({mentor_id, mentoring_id, refused_info}: IRequest){
        const mentorAndMentoring = await this.mentoringRepository.findMentoringAndMentor(mentor_id, mentoring_id);

        const { start_date } = mentorAndMentoring.mentors_availability;
        
        if(this.dateProvider.dateNow() > start_date){
            throw new AppError("It's not possible to cancel a mentoring after his initial time");
        }

        if(mentorAndMentoring.isDone){
            throw new AppError("Mentoring was already done")
        }

        if(mentorAndMentoring.refused){
            throw new AppError("Mentoring was already cancelled")
        }
            
        mentorAndMentoring.refused = true;
        mentorAndMentoring.refused_info = refused_info;

        return await this.mentoringRepository.create(mentorAndMentoring);
    }
}

export { DeleteMentoringUseCase }
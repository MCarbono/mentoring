import { ICommentsRepository } from '@modules/mentoring/repositories/ICommentsRepository'
import { IMentoringRepository } from '@modules/mentoring/repositories/IMentoringRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable} from 'tsyringe'

interface IRequest {
    mentor_id: string;
    mentoring_id: string;
}

@injectable()
class AcceptMentoringUseCase {
    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute({ mentor_id, mentoring_id, }: IRequest): Promise<void>{
        const mentorAndMentoring = await this.mentoringRepository.findMentoringAndMentor(
            mentor_id,
            mentoring_id
        )

        if(!mentorAndMentoring){
            throw new AppError("Mentoring not found", 404)
        }

        const limitDate = this.dateProvider.limitToAcceptMentoring(mentorAndMentoring.mentors_availability.start_date, 3)
        
        if(this.dateProvider.dateNow() > limitDate){
            throw new AppError("You cannot accept a mentoring at this point. Mentoring Expired")
        }
            
        if(!mentorAndMentoring) {
            throw new AppError("Mentoring and/or mentor not found");
        }

        if(mentorAndMentoring.accepted)
            throw new AppError("Mentoring is already accepted");

        mentorAndMentoring.accepted = true

        await this.mentoringRepository.create(mentorAndMentoring)

        return;
    }
}

export { AcceptMentoringUseCase }
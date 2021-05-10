import { IMentoringRepository } from '@modules/mentoring/repositories/IMentoringRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { inject, injectable} from 'tsyringe';
import { resolve } from 'path';
import { IMailProvider } from '@shared/container/providers/mailProvider/IMailProvider';
import { Mentoring } from '@modules/mentoring/infra/typeorm/entities/Mentoring';

@injectable()
class AcceptMentoringUseCase {
    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,

    ){}

    async execute(mentoring_id: string): Promise<Mentoring>{
        const templateFile = resolve(__dirname, "..", "..", "views", "emails", "acceptedMentoring.hbs")
        const mentoring = await this.mentoringRepository.findMentoringById(
            mentoring_id
        )
            
        mentoring.accepted = true

        await this.mentoringRepository.create(mentoring)
        
        const mentoringDay = this.dateProvider.convertTimestampToDate(mentoring.mentors_availability.start_date)
        const mentoringTime = this.dateProvider.convertTimestampToHoursMinutes(mentoring.mentors_availability.start_date)
    
        const variables = {
            user_name: mentoring.user.first_name,
            mentor_name: mentoring.mentor.first_name,
            mentoringDay,
            mentoringTime
        }

        await this.mailProvider.sendMail(
            mentoring.user.email,
            "Mentoria aceita!",
            variables,
            templateFile
        )
        return;
    }
}

export { AcceptMentoringUseCase }
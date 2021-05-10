import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { resolve } from 'path';

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

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
    ){}

    async execute({mentor_id, mentoring_id, refused_info}: IRequest){
        const mentorAndMentoring = await this.mentoringRepository.findMentoringAndMentor(mentor_id, mentoring_id);

        const { start_date } = mentorAndMentoring.mentors_availability;

        const templateFile = resolve(__dirname, '..', '..', 'views', 'emails', 'deletedMentoring.hbs')
        
        if(this.dateProvider.dateNow() > start_date){
            throw new AppError("It's not possible to cancel a mentoring after his initial time");
        }

        if(mentorAndMentoring.isDone){
            throw new AppError("Mentoring was already done")
        }

        if(mentorAndMentoring.refused){
            throw new AppError("Mentoring was already cancelled")
        }
        
        const { email, first_name: name_user } = mentorAndMentoring.user
        const { first_name: name_mentor } = mentorAndMentoring.mentor

        const mentoringDate = this.dateProvider.convertTimestampToDate(start_date)
        const mentoringTime = this.dateProvider.convertTimestampToHoursMinutes(start_date)

        mentorAndMentoring.refused = true;
        mentorAndMentoring.refused_info = refused_info;

        await this.mentoringRepository.create(mentorAndMentoring);

        const variables = {
            name_user,
            name_mentor,
            mentoringDate,
            mentoringTime,
            refused_info: mentorAndMentoring.refused_info
        }

        await this.mailProvider.sendMail(
            email,
            "Cancelamento da mentoria",
            variables,
            templateFile
        )

        return
    }
}

export { DeleteMentoringUseCase }
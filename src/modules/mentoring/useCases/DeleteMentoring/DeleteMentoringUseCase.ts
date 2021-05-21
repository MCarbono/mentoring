import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { resolve } from 'path';

interface IRequest {
    mentoring_id: string;
    refused_info: string;
    is_mentor: boolean;
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

    async execute({ mentoring_id, refused_info, is_mentor }: IRequest){
        const mentoring = await this.mentoringRepository.findMentoringById(mentoring_id);

        if(!mentoring){
            throw new AppError("Mentoring not found", 404)
        }

        const { start_date } = mentoring.mentors_availability;

        if(mentoring.isDone){
            throw new AppError("Mentoring was already done")
        }

        if(mentoring.refused){
            throw new AppError("Mentoring was already cancelled")
        }

        if(this.dateProvider.dateNow() > start_date){
            throw new AppError("It's not possible to cancel a mentoring after his initial time");
        }

        const mentoringDate = this.dateProvider.convertTimestampToDate(start_date)
        const mentoringTime = this.dateProvider.convertTimestampToHoursMinutes(start_date)

        mentoring.refused = true;
        mentoring.refused_info = refused_info;

        await this.mentoringRepository.create(mentoring);

        let { email, first_name: name_user } = mentoring.user
        let { first_name: name_mentor } = mentoring.mentor

        let templateFile = resolve(__dirname, '..', '..', 'views', 'emails', 'deletedMentoringByMentor.hbs')

        let variables = {
            name_user,
            name_mentor,
            mentoringDate,
            mentoringTime,
            refused_info: mentoring.refused_info
        }

        if(is_mentor) {
            await this.mailProvider.sendMail(
                email,
                "Cancelamento da mentoria",
                variables,
                templateFile
            )

            return

        } else {
            email = mentoring.mentor.email;
            name_mentor = mentoring.mentor.first_name;
            name_user = mentoring.user.first_name;

            variables = {
                name_user,
                name_mentor,
                mentoringDate,
                mentoringTime,
                refused_info: mentoring.refused_info
            }

            templateFile = resolve(__dirname, '..', '..', 'views', 'emails', 'deletedMentoringByUser.hbs')

            await this.mailProvider.sendMail(
                email,
                "Cancelamento da mentoria",
                variables,
                templateFile
            )

            return
        }

        

      

        return
    }
}

export { DeleteMentoringUseCase }
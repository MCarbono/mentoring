import { ICommentsRepository } from "@modules/mentoring/repositories/ICommentsRepository"
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository"
import { IUserRepository } from "@modules/users/repositories/IUserRepository"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

interface IRequest {
    mentoring_id: string;
    mentor_id: string;
    user_id: string;
    stars: number;
    comment: string;
}

@injectable()
class CompleteMentoringUseCase {
    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("CommentsRepository")
        private commentsRepository: ICommentsRepository,

    ){}
    async execute({mentoring_id, mentor_id, user_id, stars, comment }: IRequest): Promise<void>{
        const mentoringMentorUser = await this.mentoringRepository.findMentoringMentorUser(
            mentoring_id,
            mentor_id,
            user_id
        )   
       
        if(!mentoringMentorUser){
            throw new AppError("Mentoring not found", 404)
        }

        /*if(this.dateProvider.dateNow() < mentoringMentorUser.mentors_availability.end_date){
            throw new AppError("You cannot complete a mentoring that was not occurred yet")
        }*/

        if(!mentoringMentorUser.accepted){
            throw new AppError("You cannot finish a non-accepted mentoring")
        }

        if(mentoringMentorUser.isDone){
            throw new AppError("Mentoring is already finished")
        }

        const mentor = await this.usersRepository.findById(mentor_id)

        const newMentorStars = Number(mentor.stars) + stars;
        const newMentorTotalEvaluations = Number(mentor.total_evaluations) + 1

        mentor.stars = String(newMentorStars);
        mentor.total_evaluations = String(newMentorTotalEvaluations);

        mentoringMentorUser.isDone = true;

        await this.mentoringRepository.create(mentoringMentorUser);
        await this.usersRepository.create(mentor)
        await this.commentsRepository.create({
            comment,
            comment_star: String(stars),
            mentor_id,
            user_id
        })

        return;
    }
}

export { CompleteMentoringUseCase }
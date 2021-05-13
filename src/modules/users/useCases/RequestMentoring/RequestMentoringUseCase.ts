import { IRequestMentoringByUser } from "@modules/users/dtos/IRequestMentoringByUser";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RequestMentoringUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ){}

    async execute(mentor_id: string, user_id: string): Promise<IRequestMentoringByUser>{
        const mentor = await this.usersRepository.requestMentoringByUser(mentor_id);
        return mentor;
    }
}

export { RequestMentoringUseCase }
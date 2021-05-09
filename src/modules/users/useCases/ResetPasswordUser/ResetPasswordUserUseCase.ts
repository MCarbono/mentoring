import { IUserRepository } from "@modules/users/repositories/IUserRepository"
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUserRepository,
    ){}

    async execute(token: string, password: string): Promise<void>{
        const userToken = await this.usersTokensRepository.findByTokenUuid(token)

        if(!userToken){
            throw new AppError("Token not found", 404)
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError("Token expired")
        }
      
        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id)
    }
}

export { ResetPasswordUserUseCase }
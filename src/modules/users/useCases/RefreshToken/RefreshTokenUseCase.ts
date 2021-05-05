import auth from "@config/auth";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IResponse {
    token: string;
    refresh_token: string;
}

interface IPayload {
    email: string;
    sub: string;
}

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUserRepository,
    ){}

    async execute(token: string): Promise<IResponse>{
        const { email, sub } = verify(token, auth.refresh_token_secret) as IPayload;

        const user_id = sub
       
        const refreshTokenUser = await this.usersTokensRepository.findByIdAndToken(user_id, token)
        
        if(!refreshTokenUser){
            throw new AppError("Refresh Token does not exists!")
        }
        
        await this.usersTokensRepository.deleteById(refreshTokenUser.id)
    
        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

        const refresh_token = sign({ email }, auth.refresh_token_secret, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token
        })
        
        await this.usersTokensRepository.create({
            refresh_token,
            expires_date,
            user_id
        })

        const { is_mentor } = await this.usersRepository.findById(user_id)

        const newToken = sign({ is_mentor }, auth.expires_in_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        })

        return {
            token: newToken,
            refresh_token
        }
    }
}

export { RefreshTokenUseCase }
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";

interface ITokenResponse {
    email: string;
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute(email: string, password: string): Promise<ITokenResponse>{
        const user = await this.usersRepository.findByEmail(email)
        const { expires_in_token,
                token_secret , 
                expires_in_refresh_token,
                expires_refresh_token_days, 
                refresh_token_secret
        } = auth;

        if(!user){
            throw new AppError("Email or password incorrect", 401)
        }

        const passwordHash = await compare(password, user.password)

        if(!passwordHash){
            throw new AppError("Email or password incorrect", 401);
        }

        const token = sign({}, token_secret, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        const refresh_token = sign({ email }, refresh_token_secret, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        await this.usersTokensRepository.create({
            refresh_token,
            expires_date,
            user_id: user.id
        })

        return {
            email: user.email,
            token,
            refresh_token
        }
    }
}

export { AuthenticateUserUseCase}
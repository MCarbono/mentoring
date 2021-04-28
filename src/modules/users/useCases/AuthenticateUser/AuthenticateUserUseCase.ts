//401 

import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface ITokenResponse {
    token: string,
    email: string
}
@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,
    ){}

    async execute(email: string, password: string): Promise<ITokenResponse>{
        const user = await this.usersRepository.findByEmail(email)
        const { expires_in_token, token_secret} = auth;

        if(!user){
            throw new AppError("Email or password incorrect", 401)
        }

        const passwordHash = await compare(user.password, password)

        if(!passwordHash){
            throw new AppError("Email or password incorrect", 401);
        }

        const token = sign({}, token_secret, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        return {
            token,
            email: user.email
        }
    }
}

export { AuthenticateUserUseCase}
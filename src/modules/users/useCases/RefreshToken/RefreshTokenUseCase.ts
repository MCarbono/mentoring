import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
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
    ){}

    async execute(token: string): Promise<IResponse>{
        const { email, sub } = verify(token, auth.refresh_token_secret) as IPayload;

        const user_id = sub

        const refresh_token_exists = await this.usersTokensRepository.findByIdAndToken(user_id, token)

        if(!refresh_token_exists){
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokensRepository.deleteById(token)


        return
    }
}

export { RefreshTokenUseCase }
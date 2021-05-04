import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
}

@injectable()
class RefreshTokenLogOutUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute({ user_id }:IRequest): Promise<void>{
        const refresh_token = await this.usersTokensRepository.findTokenByUserId(user_id)

        if(!refresh_token){
            throw new AppError("User does not have a refresh token")
        }

        await this.usersTokensRepository.deleteById(refresh_token.id)

        return;
    }
}

export { RefreshTokenLogOutUseCase }
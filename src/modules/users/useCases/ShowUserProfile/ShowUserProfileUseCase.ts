import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { UserMap } from "@modules/users/Mapper/UserMap";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ShowUserProfileUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository        
    ){}

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.profile(id)
        return UserMap.toDTO(user);
    }
}

export { ShowUserProfileUseCase }
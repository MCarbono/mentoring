import { IUserRepository } from "@modules/users/repositories/IUserRepository"
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

interface IRequest {
    id: string;
    avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("LocalStorageProvider")
        private storageProvider: IStorageProvider

    ){}
    async execute({ id, avatar_file }:IRequest): Promise<void>{
        const user = await this.usersRepository.findById(id)

        if(!user){
            throw new AppError("User not found!")
        }
        
        if(user.avatar){
            await this.storageProvider.delete(user.avatar, "avatar")
        }

        await this.storageProvider.save(avatar_file, "avatar")

        user.avatar = avatar_file

        await this.usersRepository.create(user)
    }
}   

export { UpdateUserAvatarUseCase }
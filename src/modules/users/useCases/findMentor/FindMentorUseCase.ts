import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { UserMap } from '../../Mapper/UserMap';
@injectable()
class FindMentorUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ){}
    async execute(skills_id: string[]): Promise<User>{

        //validar e verificar skills

        const mentors = await this.usersRepository.findMentor(skills_id)
        
        return mentors;
    }
}

export { FindMentorUseCase }
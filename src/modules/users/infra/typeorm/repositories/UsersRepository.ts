import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";


class UsersRepository implements IUserRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }

    create(data: ICreateUserDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}

export { UsersRepository }
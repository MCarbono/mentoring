import { ICreateUsersTokensDTO } from "@modules/users/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UsersTokens";


class UsersTokensRepository implements IUsersTokensRepository{

    private repository: Repository<UsersTokens>

    constructor(){
        this.repository = getRepository(UsersTokens);
    }
    
    async create({ id, refresh_token, expires_date, user_id }: ICreateUsersTokensDTO): Promise<UsersTokens> {
        const usersTokens = this.repository.create({
            refresh_token,
            expires_date,
            user_id
        })

        return await this.repository.save(usersTokens)
    }

    async findByIdAndToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        return await this.repository.findOne({
            where: {
                refresh_token,
                user_id
            }
        })
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findTokenByUserId(user_id: string): Promise<UsersTokens> {
        return await this.repository.findOne({ user_id })
    }

    async findByTokenUuid(token: string): Promise<UsersTokens> {
        return await this.repository.findOne({ refresh_token: token})
    }

}

export { UsersTokensRepository }
import { ICommunicationsRepository } from "@modules/users/repositories/ICommunicationsRepository";
import { getRepository, Repository } from "typeorm";
import { Communication } from "../entities/Communication";


class CommunicationsRepository implements ICommunicationsRepository {
    private communicationsRepository: Repository<Communication>

    constructor(){
        this.communicationsRepository = getRepository(Communication)
    }
    create(name: string): Promise<Communication> {
        throw new Error("Method not implemented.");
    }

    async findByIds(communications_id: Communication[]): Promise<Communication[]> {
        return await this.communicationsRepository.findByIds(communications_id)
    }
}

export { CommunicationsRepository }
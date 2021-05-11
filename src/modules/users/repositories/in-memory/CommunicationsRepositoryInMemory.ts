import { Communication } from "@modules/users/infra/typeorm/entities/Communication";
import { ICommunicationsRepository } from "../ICommunicationsRepository";


class CommunicationsRepositoryInMemory implements ICommunicationsRepository {

    communications: Communication[] = [];

    async findByIds(communications_id: Communication[]): Promise<Communication[]> {
        const ids = this.communications.filter(skill => skill.id === String(communications_id))
        return ids;
    }

    async create(name: string): Promise<void> {
        const communication = new Communication()

        Object.assign(communication, {
            name
        })

        this.communications.push(communication)
    }

}

export { CommunicationsRepositoryInMemory }
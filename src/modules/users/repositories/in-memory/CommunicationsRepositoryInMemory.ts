import { Communication } from "@modules/users/infra/typeorm/entities/Communication";
import { ICommunicationsRepository } from "../ICommunicationsRepository";


class CommunicationsRepositoryInMemory implements ICommunicationsRepository {

    communications: Communication[] = [];

    async findByIds(communications_id: Communication[]): Promise<Communication[]> {
        const verifyCommunications: Communication[] = [];

        for(let communicationsDb of this.communications){
            for(let communications of communications_id){
                if(communications.id === communicationsDb.id){
                    verifyCommunications.push(communications)
                }
            }
        }

        return verifyCommunications;
    }

    async create(name: string): Promise<Communication> {
        const communication = new Communication()

        Object.assign(communication, {
            name
        })

        this.communications.push(communication)
        return communication;
    }

}

export { CommunicationsRepositoryInMemory }
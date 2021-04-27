import { Communication } from "../infra/typeorm/entities/Communication";

interface ICommunicationsRepository {
    findByIds(communications_id: Communication[]): Promise<Communication[]>
}

export { ICommunicationsRepository }
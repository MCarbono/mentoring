import { MentoringAvailability } from "../infra/typeorm/entities/MentoringAvailabilitiy";

interface IMentoringAvailabilityRepository {
    create(data:): Promise<MentoringAvailability>
}   

export { IMentoringAvailabilityRepository}
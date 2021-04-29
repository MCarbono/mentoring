import { MentoringAvailability } from "../infra/typeorm/entities/MentoringAvailabilitiy";
import { ICreateMentoringAvailability } from '../dtos/ICreateMentoringAvailability'

interface IMentoringAvailabilityRepository {
    create(data: ICreateMentoringAvailability): Promise<MentoringAvailability>
}   

export { IMentoringAvailabilityRepository}
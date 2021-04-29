import { MentorsAvailability } from "../infra/typeorm/entities/MentorsAvailability";
import { ICreateMentorsAvailability } from '../dtos/ICreateMentoringAvailability'

interface IMentorsAvailabilityRepository {
    create(data: ICreateMentorsAvailability): Promise<MentorsAvailability>
}   

export { IMentorsAvailabilityRepository}
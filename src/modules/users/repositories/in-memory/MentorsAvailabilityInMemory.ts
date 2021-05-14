import { ICreateMentorsAvailability } from "@modules/users/dtos/ICreateMentoringAvailability";
import { MentorsAvailability } from "@modules/users/infra/typeorm/entities/MentorsAvailability";
import { IMentorsAvailabilityRepository } from "../IMentorsAvailabilityRepository";


class MentorsAvailabilityInMemory implements IMentorsAvailabilityRepository {
    
    private mentorsAvailability: MentorsAvailability[] = [];

    async create({start_date, end_date, mentor_id}: ICreateMentorsAvailability): Promise<MentorsAvailability> {
        const mentorAvailability = new MentorsAvailability();

        Object.assign(mentorAvailability, {
            start_date,
            end_date,
            mentor_id
        })

        this.mentorsAvailability.push(mentorAvailability);

        return mentorAvailability;
    }

    async findById(id: string): Promise<MentorsAvailability> {
        return this.mentorsAvailability.find(mentorAvailability => mentorAvailability.id === id);
    }

    async findAvailabilitiesByMentorId(id: string): Promise<MentorsAvailability[]> {
        return this.mentorsAvailability.filter(availability => availability.mentor_id === id)
    }

}

export { MentorsAvailabilityInMemory }
import { ICreateMentorsAvailability } from '@modules/users/dtos/ICreateMentoringAvailability'
import {IMentorsAvailabilityRepository } from '@modules/users/repositories/IMentorsAvailabilityRepository'
import { getRepository, Repository } from 'typeorm'
import { MentorsAvailability } from '../entities/MentorsAvailability'

class MentorsAvailabilitiesRepository implements IMentorsAvailabilityRepository {
    private repository: Repository<MentorsAvailability>

    constructor(){
        this.repository = getRepository(MentorsAvailability)
    }

    async create({id, start_date, end_date, mentor_id}: ICreateMentorsAvailability): Promise<MentorsAvailability> {
        const mentoringAvailability = this.repository.create({
            id,
            start_date,
            end_date,
            mentor_id
        })
        return await this.repository.save(mentoringAvailability)
    }

}

export { MentorsAvailabilitiesRepository }
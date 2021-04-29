import { ICreateMentoringAvailability } from '@modules/users/dtos/ICreateMentoringAvailability'
import {IMentoringAvailabilityRepository } from '@modules/users/repositories/IMentoringAvailabilityRepository'
import { getRepository, Repository } from 'typeorm'
import { MentoringAvailability } from '../entities/MentoringAvailabilitiy'

class MentoringAvailabilitiesRepository implements IMentoringAvailabilityRepository {
    private repository: Repository<MentoringAvailability>

    constructor(){
        this.repository = getRepository(MentoringAvailability)
    }

    async create({id, start_date, end_date, mentor_id}: ICreateMentoringAvailability): Promise<MentoringAvailability> {
        const mentoringAvailability = this.repository.create({
            id,
            start_date,
            end_date,
            mentor_id
        })
        return await this.repository.save(mentoringAvailability)
    }

}

export { MentoringAvailabilitiesRepository }
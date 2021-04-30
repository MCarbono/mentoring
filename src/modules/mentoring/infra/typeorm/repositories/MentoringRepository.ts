import { ICreateMentoringDTO } from "@modules/mentoring/dtos/ICreateMentoringDTO";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { getRepository, Repository } from "typeorm";
import { Mentoring } from "../entities/Mentoring";


class MentoringRepository implements IMentoringRepository {
    private mentoringRepository: Repository<Mentoring>

    constructor(){
        this.mentoringRepository = getRepository(Mentoring)
    }

    async create({ user_id, mentor_id, mentor_availability_id, subject}: ICreateMentoringDTO): Promise<Mentoring> {
        const mentoring = this.mentoringRepository.create({
            user_id,
            mentor_id,
            mentor_availability_id,
            subject
        })
       
        return await this.mentoringRepository.save(mentoring)
    }
}

export { MentoringRepository }
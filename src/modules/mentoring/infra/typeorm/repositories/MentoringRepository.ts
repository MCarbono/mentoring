import { ICreateMentoringDTO } from "@modules/mentoring/dtos/ICreateMentoringDTO";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { getRepository, Repository } from "typeorm";
import { Mentoring } from "../entities/Mentoring";


class MentoringRepository implements IMentoringRepository {
    private mentoringRepository: Repository<Mentoring>

    constructor(){
        this.mentoringRepository = getRepository(Mentoring)
    }
    
    async create({ id, user_id, mentor_id, mentor_availability_id, subject, accepted, refused, refused_info, isDone, communication_id }: ICreateMentoringDTO): Promise<Mentoring> {
        const mentoring = this.mentoringRepository.create({
            id,
            user_id,
            mentor_id,
            mentor_availability_id,
            subject,
            accepted,
            refused,
            refused_info,
            isDone,
            communication_id
        })
       
        return await this.mentoringRepository.save(mentoring)
    }

    async findByIdMentorAvailability(id: string): Promise<Mentoring> {
        return await this.mentoringRepository.findOne({
            where: {
                mentor_availability_id: id
            }
        })
    }

    async findMentoringAndMentor(mentor_id: string, mentoring_id: string): Promise<Mentoring> {
        return await this.mentoringRepository.findOne({
            where: {
                id: mentoring_id,
                mentor_id
            },
            relations: ['mentors_availability']
        })
    }

    async findMentoringMentorUser(mentoring_id: string, mentor_id: string, user_id: string): Promise<Mentoring> {
        return await this.mentoringRepository.findOne({
            where: {
                id: mentoring_id,
                mentor_id,
                user_id
            },
            relations: ['mentors_availability']
        })
    }

    async findMentoringByUser(id: string): Promise<Mentoring[]> {
        return await this.mentoringRepository.find({
            where: {
                user_id: id
            },
        })
    }

    async findMentoringByMentor(id: string): Promise<Mentoring[]> {
        return await this.mentoringRepository.find({
            where: {
                mentor_id: id
            }
        })
    }
}

export { MentoringRepository }
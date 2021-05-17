import { ICreateMentoringDTO } from "@modules/mentoring/dtos/ICreateMentoringDTO";
import { ILoadMentoringByMentor } from "@modules/mentoring/dtos/ILoadMentoringByMentor";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { getRepository, Repository } from "typeorm";
import { Mentoring } from "../entities/Mentoring";


class MentoringRepository implements IMentoringRepository {
    private mentoringRepository: Repository<Mentoring>

    constructor(){
        this.mentoringRepository = getRepository(Mentoring)
    }
    
    async create({ id, user_id, mentor_id, mentor_availability_id, subject, accepted, refused, refused_info, isDone, communication }: ICreateMentoringDTO): Promise<Mentoring> {
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
            communication
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
            relations: ['mentors_availability', 'user', 'mentor']
        })
    }

    async findMentoringMentorUser(mentoring_id: string, mentor_id: string, user_id: string): Promise<Mentoring> {
        return await this.mentoringRepository
            .createQueryBuilder("mentoring")
            .leftJoinAndSelect("mentoring.mentors_availability", "mentors_availability")
            .leftJoinAndSelect("mentoring.user", "user")
            .where("mentoring.id = :mentoring_id", { mentoring_id})
            .andWhere("mentoring.mentor_id = :mentor_id", {mentor_id })
            .andWhere("mentoring.user_id = :user_id", { user_id })
            .select([
                "mentoring.id", "mentoring.subject","mentoring.communication",
                "user.id", "user.first_name", "user.last_name",
                "mentors_availability.start_date", "mentors_availability.end_date"
            ])
            .getOne()
    }

    
    async loadMentoringByUser(id: string): Promise<Mentoring[]> {       
        return await this.mentoringRepository  
            .createQueryBuilder("mentoring")
            .leftJoinAndSelect("mentoring.user", "user")
            .leftJoinAndSelect("mentoring.mentor", "mentor")
            .leftJoinAndSelect("mentoring.mentors_availability", "mentor_availability")
            .where("user.id = :id", { id })
            .select([
                "mentoring.id", "mentoring.accepted", "mentoring.refused",
                "mentor.first_name", "mentor.stars", 
                "mentor_availability.start_date"
            ])
            .getMany()
    }

    async loadMentoringByMentor(id: string): Promise<ILoadMentoringByMentor> {
        const listMentoring = await this.mentoringRepository
            .createQueryBuilder("mentoring")
            .leftJoinAndSelect("mentoring.user", "user")
            .leftJoinAndSelect("mentoring.mentors_availability", "mentor_availability")
            .where("mentoring.mentor_id = :id", { id })
            .andWhere("mentoring.accepted = true")
            .select([
                "mentor_availability.id", "mentor_availability.start_date", 
                "user.id", "user.first_name", "mentoring.subject", 
                "mentoring.communication"
            ])
            .getMany()

        const pendentsMentoring = await this.mentoringRepository
            .createQueryBuilder("mentoring")
            .leftJoinAndSelect("mentoring.user", "user")
            .where("mentoring.mentor_id = :id", { id })
            .andWhere("mentoring.accepted = false")
            .select([
                "mentoring.id AS mentoring_id",
                "user.id", "user.first_name", "user.last_name"
            ])
            .getRawMany();

        return {
            listMentoring,
            pendentsMentoring
        };
    }

    async findMentoringById(id: string): Promise<Mentoring> {
        return await this.mentoringRepository.findOne({
            where: {
                id
            },
            relations: ['mentors_availability', 'user', 'mentor']
        })
           
    }
}

export { MentoringRepository }
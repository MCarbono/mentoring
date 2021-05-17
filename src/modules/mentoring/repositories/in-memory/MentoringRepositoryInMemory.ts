import { ICreateMentoringDTO } from "@modules/mentoring/dtos/ICreateMentoringDTO";
import { ILoadMentoringByMentor } from "@modules/mentoring/dtos/ILoadMentoringByMentor";
import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "../IMentoringRepository";

class MentoringRepositoryInMemory implements IMentoringRepository {

    public mentoringAll: Mentoring[] =  []

    async create({ subject, mentor_id, user_id, mentor_availability_id, refused, isDone, accepted }: ICreateMentoringDTO): Promise<Mentoring> {
       const mentoring = new Mentoring();

       Object.assign(mentoring, {
           subject,
           mentor_id,
           user_id,
           mentor_availability_id,
           refused,
           isDone,
           accepted
       })

       this.mentoringAll.push(mentoring)
       return mentoring;
    }

    async findByIdMentorAvailability(id: string): Promise<Mentoring> {
        return this.mentoringAll.find(mentoring => mentoring.mentor_availability_id === id) 
    }

    findMentoringAndMentor(mentor_id: string, mentoring_id: string): Promise<Mentoring> {
        return
    }
    findMentoringMentorUser(mentoring_id: string, mentor_id: string, user_id: string): Promise<Mentoring> {
        return
    }
    loadMentoringByUser(id: string): Promise<Mentoring[]> {
        return
    }
    loadMentoringByMentor(id: string): Promise<ILoadMentoringByMentor> {
        return
    }
    async findMentoringById(id: string): Promise<Mentoring> {
        return this.mentoringAll.find(mentoring => mentoring.id === id)
    }

}

export { MentoringRepositoryInMemory }
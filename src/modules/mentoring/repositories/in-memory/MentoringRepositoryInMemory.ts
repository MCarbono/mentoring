import { ICreateMentoringDTO } from "@modules/mentoring/dtos/ICreateMentoringDTO";
import { ILoadMentoringByMentor } from "@modules/mentoring/dtos/ILoadMentoringByMentor";
import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "../IMentoringRepository";

class MentoringRepositoryInMemory implements IMentoringRepository {

    private mentoringAll: Mentoring[] =  []

    async create({ subject, mentor_id, user_id, mentor_availability_id, id, refused, isDone, accepted }: ICreateMentoringDTO): Promise<Mentoring> {
       const mentoring = new Mentoring();

       Object.assign(mentoring, {
           id,
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
    findByIdMentorAvailability(id: string): Promise<Mentoring> {
        throw new Error("Method not implemented.");
    }
    findMentoringAndMentor(mentor_id: string, mentoring_id: string): Promise<Mentoring> {
        throw new Error("Method not implemented.");
    }
    findMentoringMentorUser(mentoring_id: string, mentor_id: string, user_id: string): Promise<Mentoring> {
        throw new Error("Method not implemented.");
    }
    loadMentoringByUser(id: string): Promise<Mentoring[]> {
        throw new Error("Method not implemented.");
    }
    loadMentoringByMentor(id: string): Promise<ILoadMentoringByMentor> {
        throw new Error("Method not implemented.");
    }
    async findMentoringById(id: string): Promise<Mentoring> {
        return this.mentoringAll.find(mentoring => mentoring.id === id)
    }

}

export { MentoringRepositoryInMemory }
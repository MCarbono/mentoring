import { ICreateMentoringDTO } from "@modules/mentoring/dtos/ICreateMentoringDTO";
import { ILoadMentoringByMentor } from "@modules/mentoring/dtos/ILoadMentoringByMentor";
import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "../IMentoringRepository";


class MentoringRepositoryInMemory implements IMentoringRepository {
    create(data: ICreateMentoringDTO): Promise<Mentoring> {
        throw new Error("Method not implemented.");
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
    findMentoringById(id: string): Promise<Mentoring> {
        throw new Error("Method not implemented.");
    }

}

export { MentoringRepositoryInMemory }
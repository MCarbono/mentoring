import { ICreateMentoringDTO } from "../dtos/ICreateMentoringDTO";
import { Mentoring } from "../infra/typeorm/entities/Mentoring";


interface IMentoringRepository {
    create(data: ICreateMentoringDTO): Promise<Mentoring>
    findByIdMentorAvailability(id: string): Promise<Mentoring>
    findMentoringAndMentor(mentor_id: string, mentoring_id: string): Promise<Mentoring>
    findMentoringMentorUser(mentoring_id: string, mentor_id: string, user_id: string): Promise<Mentoring>
}

export { IMentoringRepository }
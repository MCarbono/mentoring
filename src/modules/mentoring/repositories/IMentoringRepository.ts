import { ICreateMentoringDTO } from "../dtos/ICreateMentoringDTO";
import { Mentoring } from "../infra/typeorm/entities/Mentoring";


interface IMentoringRepository {
    create(data: ICreateMentoringDTO): Promise<Mentoring>
}

export { IMentoringRepository }
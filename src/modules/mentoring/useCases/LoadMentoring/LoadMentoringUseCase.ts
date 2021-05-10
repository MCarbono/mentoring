import { ILoadMentoringByMentor } from "@modules/mentoring/dtos/ILoadMentoringByMentor";
import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class LoadMentoringUseCase {

    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,
    ){}

    async execute(is_mentor: boolean, id: string): Promise<Mentoring[] | ILoadMentoringByMentor>{
        if(is_mentor){
            return await this.mentoringRepository.loadMentoringByMentor(id);
        }

        return await this.mentoringRepository.loadMentoringByUser(id); 
    }
}

export { LoadMentoringUseCase }
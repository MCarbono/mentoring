import { Mentoring } from "@modules/mentoring/infra/typeorm/entities/Mentoring";
import { IMentoringRepository } from "@modules/mentoring/repositories/IMentoringRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class LoadMentoringUseCase {

    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,
    ){}

    async execute(is_mentor: boolean, id: string): Promise<Mentoring[]>{
         
        if(is_mentor){
            return await this.mentoringRepository.findMentoringByMentor(id);
        }
        
        return await this.mentoringRepository.findMentoringByUser(id); 
    }
}

export { LoadMentoringUseCase }
import { Mentoring } from '@modules/mentoring/infra/typeorm/entities/Mentoring';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindMentoringUseCase } from './FindMentoringUseCase';

class FindMentoringController {
    async handle(request: Request, response: Response):Promise<Response>{
        const { is_mentor, id } = request.user;
        
        const findMentoringUseCase = container.resolve(FindMentoringUseCase);

        const listMentoring = await findMentoringUseCase.execute(is_mentor, id);
       
        return response.json(listMentoring);
    }
}

export { FindMentoringController }
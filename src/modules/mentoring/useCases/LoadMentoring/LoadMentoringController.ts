import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoadMentoringUseCase } from './LoadMentoringUseCase';

class LoadMentoringController {
    async handle(request: Request, response: Response):Promise<Response>{
        //load home pages mentor/user
        const { is_mentor, id } = request.user;
        
        const loadMentoringUseCase = container.resolve(LoadMentoringUseCase);

        const listMentoring = await loadMentoringUseCase.execute(is_mentor, id);
       
        return response.json(listMentoring);
    }
}

export { LoadMentoringController }
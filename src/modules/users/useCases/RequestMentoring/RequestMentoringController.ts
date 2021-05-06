import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RequestMentoringUseCase } from './RequestMentoringUseCase';

class RequestMentoringController {
    async handle(request: Request, response: Response):Promise<Response>{
        const { mentor_id } = request.params;
        const { id: user_id } = request.user;
        
        const requestMentoringUseCase = container.resolve(RequestMentoringUseCase);

        const requestedMentoring = await requestMentoringUseCase.execute(mentor_id, user_id);

        return response.json(requestedMentoring)
    }
}

export { RequestMentoringController }
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoadAcceptMentoringUseCase } from './LoadAcceptMentoringUseCase';

class LoadAcceptMentoringController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: mentor_id } = request.user;
        const { mentoring_id, user_id } = request.params;

        const loadAcceptMentoringUsecase = container.resolve(LoadAcceptMentoringUseCase)

        const mentoring = await loadAcceptMentoringUsecase.execute(mentoring_id, mentor_id, user_id)

        return response.json(mentoring);
    }
}

export { LoadAcceptMentoringController }
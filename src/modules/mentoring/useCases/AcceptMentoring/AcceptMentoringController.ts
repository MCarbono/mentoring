import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AcceptMentoringUseCase } from './AcceptMentoringUseCase';

class AcceptMentoringController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: mentor_id } = request.user;
        const { mentoring_id } = request.params;

        const acceptMentoringUseCase = container.resolve(AcceptMentoringUseCase)

        await acceptMentoringUseCase.execute({ mentor_id, mentoring_id });

        return response.json({message: "Mentoring accept"})
    }
}

export { AcceptMentoringController }
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AcceptMentoringUseCase } from './AcceptMentoringUseCase';

class AcceptMentoringController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: mentor_id } = request.user;
        const { mentoring_id, user_id } = request.params;
        console.log(mentoring_id)
        const acceptMentoringUseCase = container.resolve(AcceptMentoringUseCase)

        await acceptMentoringUseCase.execute({ mentoring_id, mentor_id, user_id });

        return response.status(204).json({message: "Mentoring accept"})
    }
}

export { AcceptMentoringController }
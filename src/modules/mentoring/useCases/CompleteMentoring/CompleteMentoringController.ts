import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateMentoringUseCase } from './CreateMentoringUseCase';

class CompleteMentoringController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: user_id } = request.user;
        const { mentoring_id, mentor_id } = request.params;
        const { stars } = request.body;
        
        const completeMentoringUseCase = container.resolve(CreateMentoringUseCase)

        await completeMentoringUseCase.execute({ mentoring_id, mentor_id, user_id, stars })

        return response.json({ message: "Mentoring completed with success"})
    }
}

export { CompleteMentoringController }
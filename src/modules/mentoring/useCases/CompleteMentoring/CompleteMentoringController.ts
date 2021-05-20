import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CompleteMentoringUseCase } from './CompleteMentoringUseCase';

class CompleteMentoringController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: user_id } = request.user;
        const { mentoring_id, mentor_id } = request.params;
        const { stars, comment } = request.body;
        
        const completeMentoringUseCase = container.resolve(CompleteMentoringUseCase)

        await completeMentoringUseCase.execute({ mentoring_id, mentor_id, user_id, stars, comment })

        return response.status(204).json({ message: "Mentoring completed with success"})
    }
}

export { CompleteMentoringController }
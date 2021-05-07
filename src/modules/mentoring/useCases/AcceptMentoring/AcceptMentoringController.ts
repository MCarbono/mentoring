import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AcceptMentoringUseCase } from './AcceptMentoringUseCase';

class AcceptMentoringController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { mentoring_id } = request.params;
        
        const acceptMentoringUseCase = container.resolve(AcceptMentoringUseCase)

        await acceptMentoringUseCase.execute(mentoring_id);

        return response.status(204).json({message: "Mentoring accept"})
    }
}

export { AcceptMentoringController }
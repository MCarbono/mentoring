import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteMentoringUseCase } from './DeleteMentoringUseCase';

class DeleteMentoringController {
    async handle(request: Request, response: Response):Promise<Response>{
        const { mentoring_id } = request.params;
        const { id: mentor_id } = request.user;
        const { refused_info } = request.body;

        const deleteMentoringUseCase = container.resolve(DeleteMentoringUseCase)

        await deleteMentoringUseCase.execute({mentor_id, mentoring_id, refused_info})
        
        return response.json({ message: "Mentoring refused"})
    }
}

export { DeleteMentoringController }
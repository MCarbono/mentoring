import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteMentoringUseCase } from './DeleteMentoringUseCase';

class DeleteMentoringController {
    async handle(request: Request, response: Response):Promise<Response>{
        const { mentoring_id } = request.params;
        const { is_mentor } = request.user;
        const { refused_info } = request.body;

        const deleteMentoringUseCase = container.resolve(DeleteMentoringUseCase)

        await deleteMentoringUseCase.execute({ mentoring_id, refused_info, is_mentor})
        
        return response.status(204).json({ message: "Mentoring refused"})
    }
}

export { DeleteMentoringController }
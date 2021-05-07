
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateMentoringUseCase } from './CreateMentoringUseCase';


class CreateMentoringController {
    
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: user_id } = request.user;
        const { mentor_id } = request.params;
        const { mentor_availability_id, subject, communication_id } = request.body;
       
        const createMentoringUseCase = container.resolve(CreateMentoringUseCase)

        await createMentoringUseCase.execute({ user_id, mentor_id, mentor_availability_id, subject, communication_id })

        return response.send()
    }
}

export { CreateMentoringController }
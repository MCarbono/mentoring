import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateMentorAvailabilitiesUseCase } from './CreateMentorAvailabilitiesUseCase';

class CreateMentorAvailabilitiesController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.user;
        const { start_date, end_date } = request.body;

        const createMentorAvailabilitiesUseCase = container.resolve(CreateMentorAvailabilitiesUseCase);
        
        await createMentorAvailabilitiesUseCase.execute({id, start_date, end_date});
        
        return response.send();
    }
}

export { CreateMentorAvailabilitiesController }
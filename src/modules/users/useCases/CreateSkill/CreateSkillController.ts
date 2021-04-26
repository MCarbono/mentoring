import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSkillUseCase } from './CreateSkillUseCase';

class CreateSkillController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;
    
        const createSkillUseCase = container.resolve(CreateSkillUseCase)

        await createSkillUseCase.execute(name)

        return response.send()

    }
}

export { CreateSkillController }
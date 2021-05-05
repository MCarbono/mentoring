import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoadUserSkillsUseCase } from './LoadUserSkillsUseCase';

class LoadUserSkillsController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.user;
        
        const loadUSerSkillUsecase = container.resolve(LoadUserSkillsUseCase)

        const skills = await loadUSerSkillUsecase.execute(id);

        return response.json(skills)
    }
}

export { LoadUserSkillsController }
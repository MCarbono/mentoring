
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindMentorUseCase } from './FindMentorUseCase';

class FindMentorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { skills_id } = request.query;

        const skills = String(skills_id).split(',');

        const findMentorUseCase = container.resolve(FindMentorUseCase);

        const mentors = await findMentorUseCase.execute(skills);
 
        return response.json(mentors);
    }
}

export { FindMentorController }
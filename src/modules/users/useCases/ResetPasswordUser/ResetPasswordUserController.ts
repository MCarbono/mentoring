import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';
import { Request, Response } from 'express';


class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { token } = request.query;
        const { password } = request.body;
 
        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);
       
        await resetPasswordUserUseCase.execute(String(token), password);

        return response.send()
    }
}

export { ResetPasswordUserController }
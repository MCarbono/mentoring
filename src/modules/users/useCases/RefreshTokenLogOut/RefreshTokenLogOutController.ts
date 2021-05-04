import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenLogOutUseCase } from './RefreshTokenLogOutUseCase';

class RefreshTokenLogOutController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id: user_id} = request.user;

        const refreshTokenLogOutUseCase = container.resolve(RefreshTokenLogOutUseCase)

        await refreshTokenLogOutUseCase.execute({user_id})

        return response.json({ message: "success Logout"})
    }
}

export { RefreshTokenLogOutController }
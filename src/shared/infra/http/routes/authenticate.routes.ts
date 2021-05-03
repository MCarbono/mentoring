import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/users/useCases/RefreshToken/RefreshTokenController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post('/session', authenticateUserController.handle)
authenticateRoutes.post('/refresh_token', refreshTokenController.handle)

export { authenticateRoutes }
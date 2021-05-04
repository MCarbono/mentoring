import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/users/useCases/RefreshToken/RefreshTokenController';
import { RefreshTokenLogOutController } from '@modules/users/useCases/RefreshTokenLogOut/RefreshTokenLogOutController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const refreshTokenLogOutController = new RefreshTokenLogOutController()

authenticateRoutes.post('/session', authenticateUserController.handle)
authenticateRoutes.post('/refresh_token', refreshTokenController.handle)

authenticateRoutes.delete('/logout', ensureAuthenticated, refreshTokenLogOutController.handle)

export { authenticateRoutes }
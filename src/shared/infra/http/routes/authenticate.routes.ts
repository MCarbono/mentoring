import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('/session', authenticateUserController.handle)

export { authenticateRoutes }
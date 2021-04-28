import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { Router } from 'express';

const sessionRoutes = Router();

const authenticateUserController = new AuthenticateUserController()

sessionRoutes.post('/', authenticateUserController.handle)

export { sessionRoutes }
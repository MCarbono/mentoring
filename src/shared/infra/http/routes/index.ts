import { Router } from 'express';

import { skillRoutes } from './skill.routes';
import { userRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';

const routes = Router();

routes.use('/skills', skillRoutes)
routes.use('/users', userRoutes)
routes.use(authenticateRoutes)

export { routes }
import { Router } from 'express';

import { skillRoutes } from './skill.routes';
import { userRoutes } from './users.routes';

const routes = Router();

routes.use('/skills', skillRoutes)

routes.use('/users', userRoutes)

export { routes }
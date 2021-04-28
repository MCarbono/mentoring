import { Router } from 'express';

import { skillRoutes } from './skill.routes';
import { userRoutes } from './users.routes';
import { sessionRoutes } from './session.routes';

const routes = Router();

routes.use('/skills', skillRoutes)
routes.use('/users', userRoutes)
routes.use('/session', userRoutes)

export { routes }
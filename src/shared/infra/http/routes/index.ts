import { Router } from 'express';

import { skillRoutes } from './skill.routes';
import { userRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { mentoringRoutes } from './mentoring.routes';

const routes = Router();

routes.use('/skills', skillRoutes)
routes.use('/users', userRoutes)
routes.use('/mentoring', mentoringRoutes)
routes.use(authenticateRoutes)

export { routes }
import { Router } from 'express';

import { skillRoutes } from './skill.routes';

const routes = Router();

routes.use('/skills', skillRoutes)
export { routes }
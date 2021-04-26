import { Router } from 'express';
import { CreateSkillController } from '@modules/users/useCases/CreateSkill/CreateSkillController';

const skillRoutes = Router();

const createSkillController = new CreateSkillController();

skillRoutes.post('/', createSkillController.handle)

export { skillRoutes }
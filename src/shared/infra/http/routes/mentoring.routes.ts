import { CreateMentoringController } from '@modules/mentoring/useCases/CreateMentoring/CreateMentoringController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const mentoringRoutes = Router();

const createMentoringController = new CreateMentoringController();

mentoringRoutes.post('/:mentor_id', ensureAuthenticated, createMentoringController.handle)

export { mentoringRoutes }
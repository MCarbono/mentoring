import { AcceptMentoringController } from '@modules/mentoring/useCases/AcceptMentoring/AcceptMentoringController';
import { CreateMentoringController } from '@modules/mentoring/useCases/CreateMentoring/CreateMentoringController';
import { DeleteMentoringController } from '@modules/mentoring/useCases/DeleteMentoring/DeleteMentoringController';

import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { isMentor } from '../middlewares/isMentor';

const mentoringRoutes = Router();

const createMentoringController = new CreateMentoringController();
const acceptMentoringController = new AcceptMentoringController();
const deleteMentoringController = new DeleteMentoringController();

mentoringRoutes.post('/:mentor_id', ensureAuthenticated, createMentoringController.handle)

mentoringRoutes.patch('/:mentoring_id/accept', ensureAuthenticated, isMentor, acceptMentoringController.handle)

mentoringRoutes.delete('/:mentoring_id/refused', ensureAuthenticated, isMentor, deleteMentoringController.handle)

export { mentoringRoutes }
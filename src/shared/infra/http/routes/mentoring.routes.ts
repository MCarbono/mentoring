import { AcceptMentoringController } from '@modules/mentoring/useCases/AcceptMentoring/AcceptMentoringController';
import { CompleteMentoringController } from '@modules/mentoring/useCases/CompleteMentoring/CompleteMentoringController';
import { CreateMentoringController } from '@modules/mentoring/useCases/CreateMentoring/CreateMentoringController';
import { DeleteMentoringController } from '@modules/mentoring/useCases/DeleteMentoring/DeleteMentoringController';
import { LoadMentoringController } from '@modules/mentoring/useCases/LoadMentoring/LoadMentoringController';

import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { isMentor } from '../middlewares/isMentor';

const mentoringRoutes = Router();

const createMentoringController = new CreateMentoringController();
const acceptMentoringController = new AcceptMentoringController();
const deleteMentoringController = new DeleteMentoringController();
const completeMentoringController = new CompleteMentoringController();
const loadMentoringController = new LoadMentoringController();

mentoringRoutes.post('/:mentor_id', ensureAuthenticated, createMentoringController.handle)
mentoringRoutes.get('/list', ensureAuthenticated, loadMentoringController.handle)

mentoringRoutes.patch('/:mentoring_id/accept/:user_id', ensureAuthenticated, isMentor, acceptMentoringController.handle)
mentoringRoutes.patch('/:mentoring_id/complete/:mentor_id', ensureAuthenticated, completeMentoringController.handle)

mentoringRoutes.delete('/:mentoring_id/refused', ensureAuthenticated, isMentor, deleteMentoringController.handle)

export { mentoringRoutes }
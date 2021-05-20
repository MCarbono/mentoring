import { AcceptMentoringController } from '@modules/mentoring/useCases/AcceptMentoring/AcceptMentoringController';
import { CompleteMentoringController } from '@modules/mentoring/useCases/CompleteMentoring/CompleteMentoringController';
import { CreateMentoringController } from '@modules/mentoring/useCases/CreateMentoring/CreateMentoringController';
import { DeleteMentoringController } from '@modules/mentoring/useCases/DeleteMentoring/DeleteMentoringController';
import { LoadAcceptMentoringController } from '@modules/mentoring/useCases/LoadAcceptMentoring/LoadAcceptMentoringController';
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
const loadAcceptMentoringController = new LoadAcceptMentoringController();

mentoringRoutes.post('/:mentor_id', ensureAuthenticated, createMentoringController.handle)
mentoringRoutes.get('/list', ensureAuthenticated, loadMentoringController.handle)

mentoringRoutes.get('/:mentoring_id/accept/:user_id', ensureAuthenticated, isMentor, loadAcceptMentoringController.handle)
mentoringRoutes.patch('/:mentoring_id/accept', ensureAuthenticated, isMentor, acceptMentoringController.handle)
mentoringRoutes.patch('/:mentoring_id/complete/:mentor_id', ensureAuthenticated, completeMentoringController.handle)

mentoringRoutes.delete('/:mentoring_id/refused', ensureAuthenticated, deleteMentoringController.handle)

export { mentoringRoutes }
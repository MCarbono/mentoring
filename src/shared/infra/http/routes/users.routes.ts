import { CreateUserController } from '@modules/users/useCases/CreateUser/CreateUserController';
import { ShowUserProfileController } from '@modules/users/useCases/ShowUserProfile/ShowUserProfileController';
import { UpdateUserAvatarController } from '@modules/users/useCases/UpdateUserAvatar/UpdateUserAvatarController';
import { CreateMentorAvailabilitiesController } from '@modules/users/useCases/CreateMentorAvailabilities/CreateMentorAvailabilitiesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { isMentor } from '../middlewares/isMentor';

import multer from 'multer';
import uploadConfig  from '@config/upload';

import { Router } from 'express';
import { FindMentorController } from '@modules/users/useCases/FindMentor/FindMentorController';
import { LoadUserSkillsController } from '@modules/users/useCases/LoadUserSkills/LoadUserSkillsController';

const userRoutes = Router();
const upload = multer(uploadConfig)

const createUserController = new CreateUserController()
const showUserProfileController = new ShowUserProfileController()
const updateUserAvatarController = new UpdateUserAvatarController()
const createMentorAvailabilitiesController = new CreateMentorAvailabilitiesController()
const findMentorController = new FindMentorController()
const loadUserSkillsController = new LoadUserSkillsController()


//User anb Mentor routes
userRoutes.post('/', createUserController.handle)
userRoutes.patch('/avatar', upload.single('avatar'), ensureAuthenticated, updateUserAvatarController.handle)

//User router
userRoutes.get('/find_mentors', findMentorController.handle)
userRoutes.get('/profile', ensureAuthenticated, showUserProfileController.handle)
userRoutes.get('/skills', ensureAuthenticated, loadUserSkillsController.handle)

//Mentor routes
userRoutes.post(
    '/mentors/availabilities',  
    ensureAuthenticated, 
    isMentor, 
    createMentorAvailabilitiesController.handle
)

export { userRoutes }


import { CreateUserController } from '@modules/users/useCases/CreateUser/CreateUserController';
import { ShowUserProfileController } from '@modules/users/useCases/ShowUserProfile/ShowUserProfileController';
import { UpdateUserAvatarController } from '@modules/users/useCases/UpdateUserAvatar/UpdateUserAvatarController';

import multer from 'multer';
import uploadConfig  from '@config/upload';

import { Router } from 'express';

const userRoutes = Router();
const upload = multer(uploadConfig)

const createUserController = new CreateUserController()
const showUserProfileController = new ShowUserProfileController()
const updateUserAvatarController = new UpdateUserAvatarController()

userRoutes.post('/', createUserController.handle)
userRoutes.get('/:id/profile', showUserProfileController.handle)

userRoutes.patch('/:id/avatar', upload.single('avatar'), updateUserAvatarController.handle)

export { userRoutes }


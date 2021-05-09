import { ResetPasswordUserController } from '@modules/users/useCases/ResetPasswordUser/ResetPasswordUserController';
import { SendForgotMailPasswordController } from '@modules/users/useCases/SendForgotPasswordMail/SendForgotMailPasswordController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotMailPasswordController = new SendForgotMailPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotMailPasswordController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)
export { passwordRoutes }
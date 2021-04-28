import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";


export async function isMentor(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if(!user.is_mentor){
        throw new AppError("User is not a mentor. Access denied.")
    }

    next();
}
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

interface Payload {
    sub: string;
    is_mentor: boolean;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token not provided");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub : user_id, is_mentor } = verify(token, auth.token_secret) as Payload

        request.user = {
            id: user_id,
            is_mentor
        }

        next()
    } catch {
        throw new AppError("Invalid token!")
    }

}
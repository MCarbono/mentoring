import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import createConnection from '../typeorm';

import "@shared/container";

import { routes } from './routes';
import upload from '@config/upload';
createConnection();
const app = express();

app.use(express.json())

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))

app.use(routes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
})
export { app }
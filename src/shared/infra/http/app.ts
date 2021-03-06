import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import rateLimiter from '../http/middlewares/rateLimiter';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../../src/swagger.json';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import createConnection from '../typeorm';

import "@shared/container";

import { routes } from './routes';



import upload from '@config/upload';

createConnection();

const app = express();

app.use(rateLimiter);

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

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
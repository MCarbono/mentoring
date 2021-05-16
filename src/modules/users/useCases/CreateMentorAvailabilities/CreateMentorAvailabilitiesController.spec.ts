import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';
import { User } from '@modules/users/infra/typeorm/entities/User';

let connection: Connection;
let user: User;
let token: string;

describe("Create mentor's availabilities", () => {
    
    beforeAll(async() => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('12345', 8);

        await connection.query(`
            INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
            VALUES('${id}', 'Albino', 'Vieira', 'albino@gmail.com', '${password}', null, true, 'Mentor top', 0, 0, 'now()', 'now()')
        `)

        user = await connection.query(`
            SELECT * FROM users
            WHERE id = '${id}'
        `)

        const responseToken = await request(app).post('/session')
            .send({
                email: 'albino@gmail.com',
                password: '12345'
            })

        token = responseToken.body.token;
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("Should be able to create mentor's availabilities", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-17T15:00:29.091Z'))
        end_date.push(new Date('2021-05-17T16:00:29.091Z'))

        start_date.push(new Date('2021-05-18T15:00:29.091Z'))
        end_date.push(new Date('2021-05-18T16:00:29.091Z'))

        const response = await request(app).post('/users/mentors/availabilities')
            .send({
                id: user.id,
                start_date,
                end_date
            }).set({
                Authorization: `Bearer ${token}`
            })
     
        expect(response.status).toBe(200)
    })

    it("Should not create mentor's availabilities with a missing date/time", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-17T15:00:29.091Z'))
        
        const response = await request(app).post('/users/mentors/availabilities')
        .send({
            id: user.id,
            start_date,
            end_date
        }).set({
            Authorization: `Bearer ${token}`
        })
 
        expect(response.status).toBe(400)
    })

    it("Should not be able to create mentor's availability with a date before today", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-13T15:00:29.091Z'))
        end_date.push(new Date('2021-05-13T15:00:29.091Z'))

        const response = await request(app).post('/users/mentors/availabilities')
        .send({
            id: user.id,
            start_date,
            end_date
        }).set({
            Authorization: `Bearer ${token}`
        })
 
        expect(response.status).toBe(400)
    })

    it("Should not be able to create a mentor availability with a ending date before the initial date", async () => {
        let start_date: Date[] = [];
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-17T15:00:29.091Z'))
        end_date.push(new Date('2021-05-16T16:00:29.091Z'))

        const response = await request(app).post('/users/mentors/availabilities')
        .send({
            id: user.id,
            start_date,
            end_date
        }).set({
            Authorization: `Bearer ${token}`
        })
 
        expect(response.status).toBe(400)
    }),

    it("Should not be able to create a mentoring session with less than 30 minutes", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-17T15:00:29.091Z'))
        end_date.push(new Date('2021-05-17T15:10:29.091Z'))

        const response = await request(app).post('/users/mentors/availabilities')
        .send({
            id: user.id,
            start_date,
            end_date
        }).set({
            Authorization: `Bearer ${token}`
        })
 
        expect(response.status).toBe(400)
    })
})


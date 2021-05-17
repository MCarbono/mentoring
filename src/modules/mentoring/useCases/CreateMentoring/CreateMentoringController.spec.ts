import request from 'supertest';
import { app } from '@shared/infra/http/app';

import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';

let connection: Connection;
let user: User;
let mentor: User;
let user_token: string;
let mentor_availability;

describe("Create a mentoring and send email to the mentor's", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const password = await hash('12345', 8);

        let user_id = uuidV4()
        
        await connection.query(`
            INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
            VALUES('${user_id}', 'Marcelo', 'Carbono', 'marcelo@gmail.com', '${password}', null, false, 'null', 0, 0, 'now()', 'now()')
        `);

        let mentor_id = uuidV4();

        await connection.query(`
            INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
            VALUES('${mentor_id}', 'Albino', 'Vieira', 'albino@gmail.com', '${password}', null, true, 'Mentor top', 0, 0, 'now()', 'now()')
        `)

        user = await connection.query(`
            SELECT users.id FROM users
            WHERE id = '${user_id}'
        `)

        mentor = await connection.query(`
            SELECT users.id FROM users
            WHERE id = '${mentor_id}'
        `)

        let id = uuidV4()
   
        await connection.query(`
            INSERT INTO mentors_availabilities(id, start_date, end_date, mentor_id, created_at, updated_at)
            VALUES('${id}', '2021-05-18T15:00:29.091Z', '2021-05-18T16:00:29.091Z', '${mentor_id}', 'now()', 'now()')
        `)

        mentor_availability = await connection.query(`
            SELECT mentors_availabilities.id FROM mentors_availabilities
            WHERE id = '${id}'
        `)
   
       const responseToken = await request(app).post('/session')
        .send({
            email: 'marcelo@gmail.com',
            password: '12345'
        })

        user_token = responseToken.body.token;
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a mentoring and send an email to the mentor", async () => {
        const { id: mentor_id } = mentor[0];
        
        const mentoring = {
            user_id: user[0].id,
            mentor_id,
            mentor_availability_id: mentor_availability[0].id,
            subject: 'Mentoria teste',
            communication: 'google Meeting'
        }

        const response = await request(app)
            .post(`/mentoring/${mentor_id}`)
            .send(mentoring)
            .set({
                Authorization: `Bearer ${user_token}`
            })

        const responseLoadMentoring = await request(app)
            .get('/mentoring/list')
            .set({
                Authorization: `Bearer ${user_token}`
            })
        
        expect(response.status).toBe(201)
        expect(responseLoadMentoring.body.length).toBe(1)
        expect(responseLoadMentoring.body[0]).toHaveProperty('id')
    })

    it("Should not be able to create a mentoring with a non-existent mentor", async () => {
        const mentor_id =  '3a8fe27a-a827-43fa-8c4a-0eac0bbd6b11';

        const mentoring = {
            user_id: user[0].id,
            mentor_id,
            mentor_availability_id: mentor_availability[0].id,
            subject: 'Mentoria teste',
            communication: 'google Meeting'
        }

        const response = await request(app)
        .post(`/mentoring/${mentor_id}`)
        .send(
            mentoring
        ).set({
            Authorization: `Bearer ${user_token}`
        })

        const responseLoadMentoring = await request(app)
        .get('/mentoring/list')
        .set({
            Authorization: `Bearer ${user_token}`
        })
        
        expect(responseLoadMentoring.body.length).toBe(1)
        expect(response.status).toBe(400)
    })

    it("Should not be able to create a mentoring with a non-mentor user", async () => {
        const mentoring = {
            user_id: user[0].id,
            mentor_id: user[0].id,
            mentor_availability_id: mentor_availability[0].id,
            subject: 'Mentoria teste',
            communication: 'google Meeting'
        }

        const response = await request(app)
        .post(`/mentoring/${mentoring.mentor_id}`)
        .send(mentoring)
        .set({
            Authorization: `Bearer ${user_token}`
        })

        const responseLoadMentoring = await request(app)
        .get('/mentoring/list')
        .set({
            Authorization: `Bearer ${user_token}`
        })
        
        expect(responseLoadMentoring.body.length).toBe(1)
        expect(response.status).toBe(400)
    })

    it("Should not be able to create the same mentoring request", async () => {
        const { id: mentor_id } = mentor[0];
        
        const mentoring = {
            user_id: user[0].id,
            mentor_id,
            mentor_availability_id: mentor_availability[0].id,
            subject: 'Mentoria teste',
            communication: 'google Meeting'
        }

        await request(app)
            .post(`/mentoring/${mentor_id}`)
            .send(mentoring)
            .set({
                Authorization: `Bearer ${user_token}`
            })

        const response = await request(app)
        .post(`/mentoring/${mentor_id}`)
        .send(mentoring)
        .set({
            Authorization: `Bearer ${user_token}`
        })

        const responseLoadMentoring = await request(app)
        .get('/mentoring/list')
        .set({
            Authorization: `Bearer ${user_token}`
        })
        
        expect(response.status).toBe(400)
        expect(responseLoadMentoring.body.length).toBe(1)
    })
})
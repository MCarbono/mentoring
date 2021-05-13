import request from 'supertest';

import { app } from '../../../../shared/infra/http/app';
import { v4 as uuidV4 } from "uuid";

import { hash } from 'bcrypt';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection

describe("Create an authentication(login)", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        let uuid = uuidV4();
        const passwordHash = await hash('12345', 8)

        await connection.query(`
            INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
            VALUES('${uuid}', 'Marcelo', 'Carbono', 'marcelo@gmail.com', '${passwordHash}', null, false, null, 0, 0, 'now()', 'now()')
        `)
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a login to the user", async () => {
        const response = await request(app)
        .post('/session')
        .send({
            email: 'marcelo@gmail.com',
            password: '12345'
        })

        expect(response.status).toBe(200)
    })

    it("Should not be able to login with a user that doesn't exists", async () => {

        const response = await request(app)
        .post('/session')
        .send({
            email: "emailErrado@gmail.com",
            password: '12345'
        })

        expect(response.status).toBe(401)
    })

    it("Should not be able to login with a wrong password", async () => {
        const response = await request(app)
        .post('/session')
        .send({
            email: 'marcelo@gmail.com',
            password: '123dsa32145'
        })

        expect(response.status).toBe(401)
    })
})
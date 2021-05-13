import request from 'supertest';

import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;
let skills_id = '';
let communications_id = '';

describe("Create user controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        let uuid = uuidV4()

        await connection.query(
            `INSERT INTO communications(id, name)
            values('${uuid}', 'google meeting')`
        )
    
        uuid = uuidV4()
    
        await connection.query(
            `INSERT INTO skills(id, name)
            VALUES('${uuid}', 'Banco de dados Relacional')`
        )

        uuid = uuidV4()
    
        await connection.query(
            `INSERT INTO skills(id, name)
            VALUES('${uuid}', 'Banco de dados Não Relacional')`
        )

        const skills = await connection.query(`
            SELECT skills.id FROM skills
        `)

        const communications = await connection.query(`
            SELECT communications.id FROM communications
        `)

        skills_id = skills;
        communications_id = communications;
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("Should be able to create a new user", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            first_name: "Marcelo", 
            last_name: "Carbono", 
            email: "marcelo@gmail.com", 
            password: "12345", 
            is_mentor: false, 
            skills_id,
        })

        expect(response.status).toBe(201)
    })

    it("Should be able to create a mentor", async() => {
        
        const response = await request(app)
            .post("/users")
            .send({
                first_name: "Albino", 
                last_name: "teste", 
                email: "albino@gmail.com", 
                password: "12345", 
                is_mentor: true, 
                skills_id,
                communications_id
            })

        expect(response.status).toBe(201)
    })

    it("Should not be able to create a new user that already exists", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            first_name: "Marcelo", 
            last_name: "Carbono", 
            email: "marcelo@gmail.com", 
            password: "12345", 
            is_mentor: false, 
            skills_id,
        })

        expect(response.status).toBe(400)
    })

    it("Should not be able to create a user/mentor with an invalid skill id", async () => {
        const invalidSkill = {
            id: 'dsadsa-3231ds-433341313dsa-32321312dsdasds'
        }
        
        const response = await request(app)
        .post("/users")
        .send({
            first_name: "Invalid", 
            last_name: "Skill", 
            email: "invalidSkill@gmail.com", 
            password: "12345", 
            is_mentor: false, 
            skills_id: invalidSkill
        })
       
        expect(response.status).toBe(400)
    })

    it("Should not be able to create a mentor with a invalid communications", async () => {
        const invalidCommunication = {
            id: 'dsadsade-3231-5454232-dsdsadsad1e3123'
        }

        const response = await request(app)
        .post('/users')
        .send({
            first_name: "Invalid", 
            last_name: "Skill", 
            email: "invalidSkill@gmail.com", 
            password: "12345", 
            is_mentor: false, 
            skills_id,
            communications_id: invalidCommunication
        })

        expect(response.status).toBe(400)
    })
})
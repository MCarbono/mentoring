import { Communication } from "@modules/users/infra/typeorm/entities/Communication";
import { Skill } from "@modules/users/infra/typeorm/entities/Skill";
import { CommunicationsRepositoryInMemory } from "@modules/users/repositories/in-memory/CommunicationsRepositoryInMemory";
import { SkillsRepositoryInMemory } from "@modules/users/repositories/in-memory/SkillsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let skills_id: string[] = [];
let communications_id: Communication[] = [];
let usersRepositoryInMemory: UsersRepositoryInMemory
let skillsRepositoryInMemory: SkillsRepositoryInMemory
let communicationsRepositoryInMemory: CommunicationsRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Create a new User", () => {

    beforeAll(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        skillsRepositoryInMemory = new SkillsRepositoryInMemory();
        communicationsRepositoryInMemory = new CommunicationsRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory, 
            skillsRepositoryInMemory,
            communicationsRepositoryInMemory
        )

        const skill1 = await skillsRepositoryInMemory.createMemory("Banco de dados Relacional");
        const skill2 = await skillsRepositoryInMemory.createMemory("Banco de dados não Relacional");

        skills_id.push(skill1)
        skills_id.push(skill2)

        const communication1 = await communicationsRepositoryInMemory.create("google meeting")
        const communication2 = await communicationsRepositoryInMemory.create("zoom")

        communications_id.push(communication1)
        communications_id.push(communication2)
    })

    it("Should be able to create a new User(not a mentor)", async () => {
        //user not mentor
        
        const user = {
            first_name: "Marcelo", 
            last_name: "Carbono",
            email: "marcelo@gmail.com", 
            password: "12345", 
            is_mentor: false,
        }

        await createUserUseCase.execute({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_mentor: user.is_mentor,
            skills_id
        })
 
        const userCreated = await usersRepositoryInMemory.findByEmail(user.email)

        expect(userCreated).toHaveProperty('id');
    })

    it("Should be able to create a new mentor user", async () => {
        
        const user = {
            first_name: "Albino", 
            last_name: "teste",
            email: "mentor@gmail.com", 
            password: "12345", 
            is_mentor: true,
        }

        await createUserUseCase.execute({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_mentor: user.is_mentor,
            skills_id,
            communications_id
        })

        const createdMentor = await usersRepositoryInMemory.findByEmail(user.email)
        
        expect(createdMentor).toHaveProperty("id")
    })

    it("Should not be able to create a user that already exists", async () => {
        const user = {
            first_name: "teste", 
            last_name: "teste",
            email: "teste@gmail.com", 
            password: "12345", 
            is_mentor: false,
        }

        await createUserUseCase.execute({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_mentor: user.is_mentor,
            skills_id
        })

        await expect(createUserUseCase.execute({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_mentor: user.is_mentor,
            skills_id
        })
        ).rejects.toEqual(new AppError("User already exists!"))
    })

    it("Should not be able to create a mentor user with one or more communications not valid", async () => {
        const communicationNotValid: Communication = {
            id: 'dsadas23131232-32312-21321321-fdfdfdfdfd',
            name: "Communication not valid"
        }

        communications_id.push(communicationNotValid)

        const user = {
            first_name: "mentorTeste", 
            last_name: "da silva",
            email: "mentorNotValid@gmail.com", 
            password: "12345", 
            is_mentor: false,
        }

        await expect(createUserUseCase.execute({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_mentor: user.is_mentor,
            skills_id,
            communications_id
        })
        ).rejects.toEqual(new AppError("One or more communications does not exists!"))
    })

    it("Should not be able to create a user with one or more skills not valid", async () => {
        const skillNotValid: Skill = {
            id: 'dsdasdsadsadsdasdsadew',
            name: "Skill not valid",
            created_at: new Date()
        }

        skills_id.push(skillNotValid)

        const user = {
            first_name: "Teste", 
            last_name: "Teste",
            email: "Teste@gmail.com", 
            password: "12345", 
            is_mentor: false,
        }

        await expect(createUserUseCase.execute({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_mentor: user.is_mentor,
            skills_id
        })
        ).rejects.toEqual(new AppError("One or more skills does not exists!"))
    })
})
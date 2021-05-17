import { User } from "@modules/users/infra/typeorm/entities/User";

import { MentoringRepositoryInMemory } from "@modules/mentoring/repositories/in-memory/MentoringRepositoryInMemory"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/implementations/MailProviderInMemory";
import { CreateMentoringUseCase } from "./CreateMentoringUseCase";
import { MentorsAvailabilityInMemory } from "@modules/users/repositories/in-memory/MentorsAvailabilityInMemory";

let mentoringRepositoryInMemory: MentoringRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let mentorsAvailabilityInMemory: MentorsAvailabilityInMemory;

let createMentoringUseCase: CreateMentoringUseCase

let user: User;
let mentor: User;

describe("Create a new Mentoring", async () => {
    mentoringRepositoryInMemory = new MentoringRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    mentorsAvailabilityInMemory = new MentorsAvailabilityInMemory();
    createMentoringUseCase = new CreateMentoringUseCase(
        mentoringRepositoryInMemory,
        usersRepositoryInMemory,
        mailProviderInMemory
    )

    user = await usersRepositoryInMemory.create({
        first_name: 'Marcelo',
        last_name: 'Carbono',
        email: 'marcelo@gmail.com',
        password: '12345',
        is_mentor: false
    })

    mentor = await usersRepositoryInMemory.create({
        first_name: 'Albino',
        last_name: 'Freitas',
        email: 'albino@gmail.com',
        password: '12345',
        is_mentor: true,
        info_mentor: 'Mentor top'
    })

    it("Should be able to create a new mentoring", async () => {
        
    })
})
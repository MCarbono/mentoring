import { User } from "@modules/users/infra/typeorm/entities/User";
import { MentorsAvailability } from "@modules/users/infra/typeorm/entities/MentorsAvailability";

import { MentoringRepositoryInMemory } from "@modules/mentoring/repositories/in-memory/MentoringRepositoryInMemory"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/implementations/MailProviderInMemory";
import { MentorsAvailabilityInMemory } from "@modules/users/repositories/in-memory/MentorsAvailabilityInMemory";

import { CreateMentoringUseCase } from "./CreateMentoringUseCase";
import { AppError } from "@shared/errors/AppError";

let mentoringRepositoryInMemory: MentoringRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let mentorsAvailabilityInMemory: MentorsAvailabilityInMemory;

let createMentoringUseCase: CreateMentoringUseCase;

let user: User;
let mentor: User;
let mentor_availability: MentorsAvailability;

describe("Create a new Mentoring", () => {
    
    beforeEach(async () => {
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

        mentor_availability = await mentorsAvailabilityInMemory.create({
            start_date: new Date('2021-05-20T15:00:29.091Z'),
            end_date: new Date('2021-05-20T16:00:29.091Z'),
            mentor_id: mentor.id
        })
    })

    it("Should be able to create a new mentoring", async () => {
        const sendMail = spyOn(mailProviderInMemory, "sendMail")

        await createMentoringUseCase.execute({
            mentor_id: mentor.id,
            user_id: user.id,
            mentor_availability_id: mentor_availability.id,
            subject: 'Mentoria teste',
            communication: 'google meeting'
        })
        
        const mentoringCreated = await mentoringRepositoryInMemory.findMentoringById(mentoringRepositoryInMemory.mentoringAll[0].id)
     
        expect(mentoringCreated).toHaveProperty('id')
        expect(sendMail).toHaveBeenCalled()
    })

    it("Should not be able to create a mentoring with a non-existent mentor", async () => {
        const sendMail = spyOn(mailProviderInMemory, "sendMail")

        await expect(createMentoringUseCase.execute({
            mentor_id: 'ce737820-e3ab-4cd6-abca-c211c87d4f55',
            user_id: user.id,
            mentor_availability_id: mentor_availability.id,
            subject: 'Mentoria teste',
            communication: 'google meeting'
        })
        ).rejects.toEqual(new AppError("Mentor does not exists"))

        expect(sendMail).not.toHaveBeenCalled()
    })

    it("Should not be able to create a mentoring with a non-mentor", async () => {
        mentor = await usersRepositoryInMemory.create({
            first_name: 'Not a mentor',
            last_name: 'teste',
            email: 'notAmentor@gmail.com',
            password: '12345',
            is_mentor: false,
            info_mentor: 'Mentor top'
        })

        const sendMail = spyOn(mailProviderInMemory, "sendMail")

        await expect(createMentoringUseCase.execute({
            mentor_id: mentor.id,
            user_id: user.id,
            mentor_availability_id: mentor_availability.id,
            subject: 'Mentoria teste',
            communication: 'google meeting'
        })
        ).rejects.toEqual(new AppError("User mentor selected is not a mentor"))

        expect(sendMail).not.toHaveBeenCalled()
    })

    it("Should not be able to create the same mentoring", async () => {
        await createMentoringUseCase.execute({
            mentor_id: mentor.id,
            user_id: user.id,
            mentor_availability_id: mentor_availability.id,
            subject: 'Mentoria teste',
            communication: 'google meeting'
        })

        const sendMail = spyOn(mailProviderInMemory, "sendMail")

        await expect(createMentoringUseCase.execute({
            mentor_id: mentor.id,
            user_id: user.id,
            mentor_availability_id: mentor_availability.id,
            subject: 'Mentoria teste',
            communication: 'google meeting'
        })).rejects.toEqual(new AppError("Mentoring is already registered. Wait for mentor's approvement"))
        
        expect(sendMail).not.toHaveBeenCalled()
    })
})
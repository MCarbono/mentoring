
import { User } from "@modules/users/infra/typeorm/entities/User";
import { MentorsAvailabilityInMemory } from "@modules/users/repositories/in-memory/MentorsAvailabilityInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { DateProviderInMemory } from "@shared/container/providers/dateProvider/implementations/in-memory/DateProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateMentorAvailabilitiesUseCase } from "./CreateMentorAvailabilitiesUseCase";

let mentorsAvailabilityInMemory: MentorsAvailabilityInMemory
let dateProviderInMemory: DateProviderInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createMentorAvailabilitiesUseCase: CreateMentorAvailabilitiesUseCase

let user: User;

describe("Create mentor's availabilities", () => {
    beforeEach(async () => {
        mentorsAvailabilityInMemory = new MentorsAvailabilityInMemory()
        dateProviderInMemory = new DateProviderInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createMentorAvailabilitiesUseCase = new CreateMentorAvailabilitiesUseCase(mentorsAvailabilityInMemory, dateProviderInMemory);

        const userMentor = await usersRepositoryInMemory.create({
            first_name: 'Marcelo',
            last_name: 'Carbono',
            email: 'marcelo@gmail.com',
            password: '12345',
            is_mentor: false
        })

        user = userMentor;
    })

    it("Should be able to create a new mentor's availability", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-15T15:00:29.091Z'))
        start_date.push(new Date('2021-05-15T16:00:29.091Z'))

        end_date.push(new Date('2021-05-15T16:00:29.091Z'))
        end_date.push(new Date('2021-05-15T17:00:29.091Z'))

        const { id } = user;

        await createMentorAvailabilitiesUseCase.execute({
            id,
            start_date,
            end_date
        })
        
        const availabilities = await mentorsAvailabilityInMemory.findAvailabilitiesByMentorId(id);
        
        availabilities.map(availability => {
            expect(availability).toHaveProperty('id')
        })
    })

    it(`Should not be able to create availabilities with a date that is before today`, async () => {
        
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date(2021, 4, 11, 10))
        start_date.push(new Date(2021, 4, 11, 10))

        end_date.push(new Date(2021, 4, 11, 11))
        end_date.push(new Date(2021, 4, 15, 11))

        console.log(start_date)
        const { id } = user;

        await expect(createMentorAvailabilitiesUseCase.execute({
            id,
            start_date,
            end_date
        })).rejects.toEqual(new AppError("One initial mentoring date is before today"))
    })

    it("Should not be able to create availabilities when one final date is before the initial date", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date(2021, 4, 15, 14))
        end_date.push(new Date(2021, 4, 14, 15))

        const { id } = user;

        await expect(createMentorAvailabilitiesUseCase.execute({
            id,
            start_date,
            end_date
        })).rejects.toEqual(new AppError("One final mentoring date is before the initial date"))
    })

    it("Should not be able to create an availability with a duration less than 30 minutes", async () => {
        let start_date: Date[] = [];
        let end_date: Date[] = [];

        start_date.push(new Date(2021, 4, 15, 14))
        end_date.push(new Date(2021, 4, 15, 14, 15))

        const { id } = user;

        await expect(createMentorAvailabilitiesUseCase.execute({
            id,
            start_date,
            end_date
        })
        ).rejects.toEqual(new AppError("The mentoring session needs to be at least 30 minutes duration. One of yours mentoring does not have it."))
    })
})
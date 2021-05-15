
import { User } from "@modules/users/infra/typeorm/entities/User";
import { MentorsAvailabilityInMemory } from "@modules/users/repositories/in-memory/MentorsAvailabilityInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateMentorAvailabilitiesUseCase } from "./CreateMentorAvailabilitiesUseCase";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";

let mentorsAvailabilityInMemory: MentorsAvailabilityInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createMentorAvailabilitiesUseCase: CreateMentorAvailabilitiesUseCase
let dayjsDateProvider: DayjsDateProvider

let user: User;

describe("Create mentor's availabilities", () => {
    beforeEach(async () => {
        mentorsAvailabilityInMemory = new MentorsAvailabilityInMemory()
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider()
        createMentorAvailabilitiesUseCase = new CreateMentorAvailabilitiesUseCase(mentorsAvailabilityInMemory, dayjsDateProvider);

        const userMentor = await usersRepositoryInMemory.create({
            first_name: 'Marcelo',
            last_name: 'Carbono',
            email: 'marcelo@gmail.com',
            password: '12345',
            is_mentor: true,
            info_mentor: 'Mentor top'
        })

        user = userMentor;
    })

    it("Should be able to create a new mentor's availability", async () => {
        let start_date: Date[] = [] ;
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-15T15:00:29.091Z'))
        end_date.push(new Date('2021-05-15T16:00:29.091Z'))

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

        start_date.push(new Date('2021-05-15T15:00:29.091Z'))
        end_date.push(new Date('2021-05-15T15:15:29.091Z'))

        const { id } = user;

        await expect(createMentorAvailabilitiesUseCase.execute({
            id,
            start_date,
            end_date
        })
        ).rejects.toEqual(new AppError("The mentoring session needs to be at least 30 minutes duration. One of yours mentoring does not have it."))
    })

    it("Should not be able to create an availability with a missing date/time", async () => {
        let start_date: Date[] = [];
        let end_date: Date[] = [];

        start_date.push(new Date('2021-05-15T15:00:29.091Z'))
        end_date.push(new Date('2021-05-15T16:00:29.091Z'))

        start_date.push(new Date('2021-05-15T15:00:29.091Z'))

        const { id } = user;

        await expect(createMentorAvailabilitiesUseCase.execute({
            id,
            start_date,
            end_date
        })
        ).rejects.toEqual(new AppError("One or more dates are equal or missing one date register."))
    })
})
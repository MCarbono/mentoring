import { container } from 'tsyringe'

import './providers';

import { SkillsRepository } from '@modules/users/infra/typeorm/repositories/SkillsRepository'
import { ISkillsRepository } from '@modules/users/repositories/ISkillsRepository'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'

import { ICommunicationsRepository } from '@modules/users/repositories/ICommunicationsRepository'
import { CommunicationsRepository } from '@modules/users/infra/typeorm/repositories/CommunicationsRepository'

import { IMentoringAvailabilityRepository } from '@modules/users/repositories/IMentoringAvailabilityRepository';
import { MentoringAvailabilitiesRepository } from '@modules/users/infra/typeorm/repositories/MentoringAvailabilitiesRepository';

container.registerSingleton<ISkillsRepository>(
    "SkillsRepository",
    SkillsRepository
)

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICommunicationsRepository>(
    "CommunicationsRepository",
    CommunicationsRepository
)

container.registerSingleton<IMentoringAvailabilityRepository>(
    "MentoringAvailabilitiesRepository",
    MentoringAvailabilitiesRepository
)


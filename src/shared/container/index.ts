import { container } from 'tsyringe'

import './providers';

import { SkillsRepository } from '@modules/users/infra/typeorm/repositories/SkillsRepository'
import { ISkillsRepository } from '@modules/users/repositories/ISkillsRepository'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'

import { ICommunicationsRepository } from '@modules/users/repositories/ICommunicationsRepository'
import { CommunicationsRepository } from '@modules/users/infra/typeorm/repositories/CommunicationsRepository'

import { IMentorsAvailabilityRepository } from '@modules/users/repositories/IMentorsAvailabilityRepository';
import { MentorsAvailabilitiesRepository } from '@modules/users/infra/typeorm/repositories/MentorsAvailabilitiesRepository';

import { IMentoringRepository } from '@modules/mentoring/repositories/IMentoringRepository';
import { MentoringRepository } from '@modules/mentoring/infra/typeorm/repositories/MentoringRepository';

import { ICommentsRepository } from '@modules/mentoring/repositories/ICommentsRepository';
import { CommentsRepository } from '@modules/mentoring/infra/typeorm/repositories/CommentsRepository';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

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

container.registerSingleton<IMentorsAvailabilityRepository>(
    "MentorsAvailabilitiesRepository",
    MentorsAvailabilitiesRepository
)

container.registerSingleton<IMentoringRepository>(
    "MentoringRepository",
    MentoringRepository
)

container.registerSingleton<ICommentsRepository>(
    "CommentsRepository",
    CommentsRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)



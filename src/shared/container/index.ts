import { container } from 'tsyringe'

import { SkillsRepository } from '@modules/users/infra/typeorm/repositories/SkillsRepository'
import { ISkillsRepository } from '@modules/users/repositories/ISkillsRepository'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<ISkillsRepository>(
    "SkillsRepository",
    SkillsRepository
)

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
)


import { Communication } from '@modules/users/infra/typeorm/entities/Communication'
import { Skill } from '@modules/users/infra/typeorm/entities/Skill'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { ICommunicationsRepository } from '@modules/users/repositories/ICommunicationsRepository'
import { ISkillsRepository } from '@modules/users/repositories/ISkillsRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

interface IRequest {
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    is_mentor: boolean, 
    info_mentor: string,
    skills_id: Skill[],
    communications_id: Communication[]
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("SkillsRepository")
        private skillsRepository: ISkillsRepository,

        @inject("CommunicationsRepository")
        private communicationsRepository: ICommunicationsRepository
    ){}

    async execute({ first_name, last_name, email, password, is_mentor, skills_id, info_mentor, communications_id }: IRequest): Promise<User>{
        const userExists = await this.usersRepository.findByEmail(email)

        if(userExists){
            throw new AppError("User already exists!")
        }

        const passwordHash = await hash(password, 8)

        const skills = await this.skillsRepository.findByIds(skills_id)

        if(skills.length !== skills_id.length){
            throw new AppError("One or more skills does not exists!")
        }

        let communications: Communication[];
        if(communications_id){
             communications = await this.communicationsRepository.findByIds(communications_id)

            if(communications.length !== communications_id.length){
                throw new AppError("One or more communications does not exists!")
            }
        }
        
        if(!is_mentor){
            const user = await this.usersRepository.create({
                first_name,
                last_name,
                email,
                password: passwordHash,
                is_mentor,
            })

            skills.map(async skill => {
                await this.usersRepository.insertPivotTableSkills({
                    user_id: user.id,
                    skill_id: skill.id
                })
            })
            
            return user;
            
        } else {
            const user = await this.usersRepository.create({
                first_name,
                last_name,
                email,
                password: passwordHash,
                is_mentor,
                info_mentor
            })

            skills.map(async skill => {
                await this.usersRepository.insertPivotTableSkills({
                    user_id: user.id,
                    skill_id: skill.id
                })
            })

            communications.map(async communication => {
                await this.usersRepository.insertPivotTableCommunications({
                    user_id: user.id,
                    communication_id: communication.id
                })
            })

            return user;
        }

        return
    }
}

export { CreateUserUseCase }
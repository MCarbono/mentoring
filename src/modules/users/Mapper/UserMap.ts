import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

import { classToClass } from 'class-transformer'

class UserMap {
    static toDTO({
        first_name,
        last_name,
        email,
        is_mentor,
        skills,
        info_mentor,
        total_evaluations,
        stars,
        communications,
        mentors_availabilities,
        avatar_url,
        avatar,
        comments
    }: User): IUserResponseDTO{
        const user = classToClass({
            first_name,
            last_name,
            email,
            is_mentor,
            skills,
            avatar_url,
            avatar
        })

        if(is_mentor){
            Object.assign(user, {
                info_mentor,
                total_evaluations,
                stars,
                communications,
                mentors_availabilities,
                comments
            })
        }
        return user;
    }
}

export { UserMap }
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

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
        communications
    }: User): IUserResponseDTO{
        const user = {
            first_name,
            last_name,
            email,
            is_mentor,
            skills
        }

        if(is_mentor){
            Object.assign(user, {
                info_mentor,
                total_evaluations,
                stars,
                communications
            })
        }
        return user;
    }
}

export { UserMap }
import { Communication } from "../infra/typeorm/entities/Communication";
import { MentorsAvailability } from "../infra/typeorm/entities/MentorsAvailability";
import { Skill } from "../infra/typeorm/entities/Skill";

interface IUserResponseDTO {
    first_name: string;
    last_name: string;
    email: string;
    is_mentor: boolean;
    skills: Skill[];
    info_mentor?: string;
    total_evaluations?: string;
    stars?: string;
    communications?: Communication[];
    mentors_availabilities?: MentorsAvailability[]

}

export { IUserResponseDTO }
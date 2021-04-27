import { Communication } from "../infra/typeorm/entities/Communication";
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
    communications?: Communication[]

}

export { IUserResponseDTO }
import { Communication } from "../infra/typeorm/entities/Communication";
import { Skill } from "../infra/typeorm/entities/Skill";

interface ICreateUserDTO {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_mentor: boolean;
    avatar?: string;
    info_mentor?: string;
    stars?: string;
    total_evaluations?: string;
    skills?: Skill[];
    communications?: Communication[]
}

export { ICreateUserDTO }
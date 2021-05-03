

interface ICreateMentoringDTO {
    id?: string;
    subject: string;
    mentor_id: string;
    user_id: string;
    mentor_availability_id: string;
    accepted: boolean;
    refused: boolean;
    refused_info: string;
    isDone?: boolean;
}

export { ICreateMentoringDTO }
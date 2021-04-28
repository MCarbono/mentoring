

interface ICreateMentoringAvailability {
    id?: string;
    start_date: Date;
    end_date: Date;
    mentor_id: string;
}

export { ICreateMentoringAvailability }
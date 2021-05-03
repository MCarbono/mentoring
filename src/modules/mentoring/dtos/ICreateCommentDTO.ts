

interface ICreateCommentDTO {
    id?: string;
    comment: string;
    comment_star: string;
    user_id: string;
    mentor_id: string;
}

export { ICreateCommentDTO }
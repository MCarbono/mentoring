

interface ICreateUsersTokensDTO {
    id?: string;
    refresh_token: string;
    expires_date: Date;
    user_id: string;
}

export { ICreateUsersTokensDTO }
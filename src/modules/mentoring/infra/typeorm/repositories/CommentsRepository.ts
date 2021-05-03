import { ICreateCommentDTO } from "@modules/mentoring/dtos/ICreateCommentDTO";
import { ICommentsRepository } from "@modules/mentoring/repositories/ICommentsRepository";
import { getRepository, Repository } from "typeorm";
import { Comment } from "../entities/Comment";


class CommentsRepository implements ICommentsRepository {

    private repository: Repository<Comment>

    constructor(){
        this.repository = getRepository(Comment);
    }

    async create({id, comment, comment_star, user_id, mentor_id }: ICreateCommentDTO): Promise<Comment> {
        
        const createComment = this.repository.create({
            comment,
            comment_star,
            user_id,
            mentor_id
        })

        return await this.repository.save(createComment)
    }

}

export { CommentsRepository }
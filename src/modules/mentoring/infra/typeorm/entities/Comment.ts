import { User } from "../../../../users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';


@Entity("comments")
class Comment {

    @PrimaryColumn()
    id?: string;

    @Column()
    comment: string;

    @Column()
    comment_star: string;

    @Column()
    user_id: string;

    @Column()
    mentor_id: string;
    
    //Verificar problema seed erro Comments
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: "mentor_id"})
    mentor: User 

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Comment }  
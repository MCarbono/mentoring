import { MentorsAvailability } from "../../../../users/infra/typeorm/entities/MentorsAvailability";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4} from 'uuid';

@Entity("mentoring")
class Mentoring {
    @PrimaryColumn()
    id?: string;

    @Column()
    subject: string;

    @Column()
    isDone: boolean;

    @Column()
    refused: boolean;

    @Column()
    refused_info: string;

    @Column()
    mentor_id: string;

    @Column()
    user_id: string;

    @Column()
    mentor_availability_id: string;

    @ManyToOne(() => User, user => user.mentoring)
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToOne(() => User, user => user.mentoring)
    @JoinColumn({name: "mentor_id"})
    mentor: User;

    @ManyToOne(() => MentorsAvailability)
    @JoinColumn({name: "mentor_availability_id"})
    mentors_availability: MentorsAvailability

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    accepted: boolean;

    @Column()
    communication: string;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        } 
    }
}

export { Mentoring }
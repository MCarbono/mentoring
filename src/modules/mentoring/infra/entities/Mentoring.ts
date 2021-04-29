import { MentorsAvailability } from "@modules/users/infra/typeorm/entities/MentorsAvailability";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuidV4} from 'uuid';

@Entity("mentoring")
class Mentoring {

    @PrimaryColumn()
    id?: string;
    
    @Column()
    subject:string;

    @Column()
    isDone: boolean;

    @Column()
    refused: boolean;

    @Column()
    refused_info: string;

    @Column()
    mentor_id: string;

    @ManyToOne(() => User, user => user.mentoring)
    @JoinColumn({name: "mentor_id"})
    mentor: User;

    @Column()
    user_id: string
    
    @ManyToOne(() => User, user => user.mentoring)
    user: User;

    @Column()
    mentor_availability_id: string;

    @ManyToOne(() => MentorsAvailability, mentors_availability => mentors_availability.mentoring)
    mentor_availability: MentorsAvailability;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { Mentoring }
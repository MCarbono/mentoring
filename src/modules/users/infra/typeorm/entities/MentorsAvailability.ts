
import { Mentoring } from "../../../../mentoring/infra/typeorm/entities/Mentoring";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as  uuidV4 } from 'uuid';
import { User } from "./User";

@Entity("mentors_availabilities")
class MentorsAvailability {

    @PrimaryColumn()
    id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    mentor_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.mentors_availabilities)
    @JoinColumn({
        name: "mentor_id",
    })
    user: User

    @OneToMany(() => Mentoring, mentoring => mentoring.mentors_availability)
    mentoring: Mentoring

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { MentorsAvailability }
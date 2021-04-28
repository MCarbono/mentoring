import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as  uuidV4 } from 'uuid';
import { User } from "./User";

@Entity("mentoring_availabilities")
class MentoringAvailability {

    @PrimaryColumn()
    id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @ManyToOne(() => User)
    @JoinColumn({
        name: "mentor_id"
    })
    mentor: User

    @Column()
    mentor_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { MentoringAvailability }
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid';
import { Communication } from './Communication';
import { Skill } from './Skill';

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_mentor: boolean;

    @Column()
    avatar: string;

    @Column()
    info_mentor: string;

    @Column()
    stars: string;

    @Column()
    total_evaluations: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Skill)
    @JoinTable({
        name: "users_skills",
        joinColumns: [{ name: "user_id"}],
        inverseJoinColumns: [{ name: 'skill_id'}]
    })
    skills: Skill[];

    @ManyToMany(() => Communication)
    @JoinTable({
        name: "mentors_communications",
        joinColumns: [{ name: "mentor_id"}],
        inverseJoinColumns: [{ name: "communication_id"}]
    })
    communications: Communication[];

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }

}

export { User }
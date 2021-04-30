
import { Mentoring } from '../../../../mentoring/infra/typeorm/entities/Mentoring';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid';
import { Communication } from './Communication';
import { MentorsAvailability } from './MentorsAvailability';
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

    @OneToMany(() => MentorsAvailability, mentors_availability => mentors_availability.user)
    mentors_availabilities: MentorsAvailability[]

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

    @OneToMany(() => Mentoring, mentoring => mentoring.mentor)
    mentoring: Mentoring

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }

}

export { User }
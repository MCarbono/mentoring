import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("communications")
class Communication {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
}

export { Communication }
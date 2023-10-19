import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    name: string;

    @Column()
    access_level: string;
}

import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    password_hash: string;

    @Column({ unique: true })
    email: string;

    @Column()
    date_of_birth: string;

    @Column({nullable: true})
    about: string;

    @Column()
    gender: string;

    @Column()
    createdAt: string;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;
}
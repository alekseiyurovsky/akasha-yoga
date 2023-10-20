import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from './Role';

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

    @Column({nullable: true})
    gender: string;

    @Column()
    createdAt: string;

    @Column()
    roleId: number;

    @ManyToOne(() => Role, (Role) => Role.id)
    @JoinColumn({name: 'roleId'})
    role: Role;
}

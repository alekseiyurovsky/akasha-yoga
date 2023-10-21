import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from './Role';
import * as bcrypt from 'bcrypt';

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

    @Column({nullable: true})
    date_of_birth: string;

    @Column({nullable: true})
    about: string;

    @Column({nullable: true})
    gender: string;

    @CreateDateColumn()
    created_at: string;

    @Column()
    roleId: number;

    @ManyToOne(() => Role, (Role) => Role.id)
    @JoinColumn({name: 'roleId'})
    role: Role;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password_hash);
    }
}

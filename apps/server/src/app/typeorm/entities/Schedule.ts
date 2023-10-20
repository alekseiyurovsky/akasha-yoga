import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Training} from './Training';
import {User} from './User';

@Entity({name: 'schedule'})
export class Schedule {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    date: string;

    @Column({default: '[]'})
    unapproved_participients: string;

    @Column({default: '[]'})
    approved_participients: string;

    @Column()
    training_id: number;

    @Column()
    author_id: number;

    @ManyToOne(() => Training, (Training) => Training.id)
    @JoinColumn({name: 'training_id'})
    training: Training;

    @ManyToOne(() => User, (User) => User.id)
    @JoinColumn({name: 'author_id'})
    author: User;
}

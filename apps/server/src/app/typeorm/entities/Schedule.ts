import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Training} from './Training';
import {User} from './User';

@Entity({name: 'schedules'})
export class Schedule {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column('datetime')
    date: Date;

    @Column({type: 'json', nullable: true})
    unapproved_entrants: number[];

    @Column({type: 'json', nullable: true})
    approved_entrants: number[];

    @Column()
    training_id: number;

    @Column()
    author_id: number;

    @ManyToOne(() => Training, (Training) => Training.id,  { onDelete: 'CASCADE'})
    @JoinColumn({name: 'training_id'})
    training: Training;

    @ManyToOne(() => User, (User) => User.id)
    @JoinColumn({name: 'author_id'})
    author: User;
}

import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity({name: 'trainings'})
export class Training {
    @PrimaryGeneratedColumn({type: 'bigint'}) id: number;
    @Column() name: string;
    @Column() description: string;
    @Column({nullable: true}) image_url: string;
    @CreateDateColumn() date_added: string;
    @Column() duration: number;
    @Column() max_count: number;
    @Column() author_id: number;

    @ManyToOne(
        () => User, (User) => User.id
    )
    @JoinColumn({name: 'author_id'})
    author: User;
}

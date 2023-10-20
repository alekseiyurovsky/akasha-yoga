import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity({name: 'announcements'})
export class Announcement {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({nullable: true})
    image_url: string;

    @Column()
    priority: number;

    @Column()
    date_added: string;

    @Column()
    author_id: number;

    @ManyToOne(() => User, (User) => User.id)
    @JoinColumn({name: 'author_id'})
    author: User;
}

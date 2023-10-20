import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity({name: 'articles'})
export class Article {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({nullable: true})
    image_url: string;

    @Column()
    date_added: string;

    @Column()
    author_id: number;

    @ManyToOne(() => User, (User) => User.id)
    @JoinColumn({name: 'author_id'})
    author: User;
}

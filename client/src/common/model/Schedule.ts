import {User} from "./User";
import {Training} from "./Training";

export interface Schedule {
    id: string;
    date: string;
    training_i: string;
    author_id: string;
    author: Pick<User, 'name' | 'surname'>,
    training: Pick<Training, 'id' | 'name' | 'max_count' | 'image_url' | 'duration'>,
    approved: Pick<User, 'name' | 'surname' | 'id'>[],
    unapproved: Pick<User, 'name' | 'surname' | 'id'>[]
}

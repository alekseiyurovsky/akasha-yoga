import {User} from "./User";

export interface Training {
    id: number;
    name: string;
    description: string;
    image_url: string;
    date_added: string;
    duration: number;
    max_count: number;
    author: Pick<User, 'name' | 'surname'>
}

export type TrainingView = Pick<Training, 'id' | 'name' | 'image_url' | 'date_added' | 'author'>

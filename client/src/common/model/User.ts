import {Role} from "./Role";

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    date_of_birth: string;
    about?: string;
    role: Role;
}

import {Role} from "./Role";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    date_of_birth: string;
    about?: string;
    role: Role;
}

export interface SignInResponse extends User {
  access_token: string;
}

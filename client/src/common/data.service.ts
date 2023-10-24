import {Injectable} from "@angular/core";
import {User} from "./model/User";

@Injectable({providedIn: 'root'})
export class DataService {

    private user: User | undefined = undefined;

    public setUser(user: User) {
        this.user = user;
    }

    public getUser(): User {
        return this.user as User;
    }

    public isAdmin(): boolean {
        return !!this.user && this.user.role.access_level > 1;
    }

    public isLoggedIn(): boolean {
        return !!this.user;
    }

    public getName(): string {
        return this.user ? `${this.user?.name} ${this.user.surname}` : '';
    }
}

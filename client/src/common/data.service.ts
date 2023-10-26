import {Injectable} from "@angular/core";
import {User} from "./model/User";

@Injectable({providedIn: 'root'})
export class DataService {

    private user: User | undefined = undefined;
    private schedules = [];

    public setUser(user: User) {
        this.user = user;
    }

    public setUserSchedules(schedules: []): void {
        this.schedules = schedules;
    }

    public getUser(): User {
        return this.user as User;
    }

    public getSchedules() {
        return this.schedules;
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

    public cleanUp(): void {
        this.user = undefined;
    }
}

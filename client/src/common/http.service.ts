import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class HttpService {

    private jwt: string;

    constructor(private client: HttpClient) {
    }

    setToken(token: string) {
        this.jwt = token;
    }

    getToken(token: string): string {
        return this.jwt;
    }
}

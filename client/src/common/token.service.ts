import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {User} from "./model/User";

export type UserToken = Omit<User, 'date_of_birth' | 'about' | 'role'>;

@Injectable({providedIn: 'root'})
export class JWTService {

    private jwtToken = '';
    private decodedToken: { [key: string]: string } = {};

    public setToken(token: string) {
        if (token) {
            this.jwtToken = token;
        }
    }

    public getToken() {
        return this.jwtToken;
    }

    public decodeToken() {
        if (this.jwtToken) {
            this.decodedToken = jwt_decode.default(this.jwtToken);
        }
    }

    public getDecodeToken() {
        return jwt_decode.default(this.jwtToken);
    }

    public getDecoded(): UserToken {
        this.decodeToken();
        return {
            id: this.decodedToken['id'],
            email: this.decodedToken['email'],
            name: this.decodedToken['name'],
            surname: this.decodedToken['surname']
        }
    }

    public getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['exp'] : null;
    }

    public isTokenExpired(): boolean {
        const expiryTime: string | null = this.getExpiryTime();
        if (!expiryTime) {
            return true;
        }
        return ((1000 * +expiryTime) - (new Date()).getTime()) < 5000;
    }
}

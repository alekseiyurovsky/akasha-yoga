import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {HttpService} from "../../common/http.service";
import {JWTTokenService, UserToken} from "../../common/token.service";
import {LocalStorageService} from "../../common/local-storage.service";
import {User} from "../../common/model/User";

export const userSchedulesResolver: ResolveFn<any> = () => {
    const token = inject(LocalStorageService).get();
    if(!token) {
        return;
    }
    const tokenService = inject(JWTTokenService);
    tokenService.setToken(token);
    if (tokenService.isTokenExpired()) {
        return;
    }
    const httpService = inject(HttpService);
    httpService.setToken(token);

    return httpService.get(`api/users/${(tokenService.getDecodeToken() as UserToken).id}/schedules`);
};

export const userDataResolver: ResolveFn<User | undefined> = () => {
    const token = inject(LocalStorageService).get();
    if(!token) {
        return;
    }
    const tokenService = inject(JWTTokenService);
    tokenService.setToken(token);
    if (tokenService.isTokenExpired()) {
        return;
    }
    const httpService = inject(HttpService);
    httpService.setToken(token);

    return httpService.get(`api/users/${(tokenService.getDecodeToken() as UserToken).id}`);
};

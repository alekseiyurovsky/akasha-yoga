import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {HttpService} from "../../common/http.service";
import {JWTService, UserToken} from "../../common/token.service";
import {LocalStorageService} from "../../common/local-storage.service";

export const userSchedulesResolver: ResolveFn<any> = () => {
    const token = inject(LocalStorageService).get();
    if(!token) {
        return;
    }
    const tokenService = inject(JWTService);
    tokenService.setToken(token);
    if (tokenService.isTokenExpired()) {
        return;
    }
    const httpService = inject(HttpService);
    httpService.setToken(token);

    return httpService.get(`api/users/${(tokenService.getDecodeToken() as UserToken).id}/schedules`);
};

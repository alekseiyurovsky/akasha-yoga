import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {DataService} from "../../common/data.service";
import {LocalStorageService} from "../../common/local-storage.service";
import {JWTService} from "../../common/token.service";

export const userGuardFn: ResolveFn<unknown> = () => {
    const dataService = inject(DataService);
    const token = inject(LocalStorageService).get();
    const tokenService = inject(JWTService);

    let hasValidToken = false;

    if (token) {
        tokenService.setToken(token);
        hasValidToken = !tokenService.isTokenExpired();
    }

    return dataService.isLoggedIn() || hasValidToken
};

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation,} from '@angular/router';
import {UniversalInterceptor} from '../common/universal-interceptor.service';
import {appRoutes} from './app.routes';
import {CookieService} from "ngx-cookie-service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        importProvidersFrom(HttpClientModule),
        {provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true},
        CookieService
    ],
};

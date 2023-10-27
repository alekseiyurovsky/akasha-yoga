import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withEnabledBlockingInitialNavigation} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {firstValueFrom} from 'rxjs';
import {DataService} from '../common/data.service';
import {HttpService} from '../common/http.service';
import {LocalStorageService} from '../common/local-storage.service';
import {User} from '../common/model/User';
import {JWTTokenService, UserToken} from '../common/token.service';
import {UniversalInterceptor} from '../common/universal-interceptor.service';
import {appRoutes} from './app.routes';

function initializeAppFactory(
  storage: LocalStorageService,
  tokenService: JWTTokenService,
  httpService: HttpService,
  dataService: DataService
): () => Promise<any> {
  return () => new Promise(async (resolve, reject) => {
    const token = storage.get();
    if (!token) {
      resolve(true);
      return;
    }
    tokenService.setToken(token);
    if (tokenService.isTokenExpired()) {
      resolve(true);
      return;
    }
    httpService.setToken(token);

    const user = await firstValueFrom(httpService.get<User>(`api/users/${(tokenService.getDecodeToken() as UserToken).id}`));
    dataService.setUser(user);
    resolve(true);
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true},
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [LocalStorageService, JWTTokenService, HttpService, DataService]
    }
  ]
};

import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class UniversalInterceptor implements HttpInterceptor {

    constructor(private httpService: HttpService) {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const token = this.httpService.getToken();
        console.log('pew pew pew intercepted', token);
        req = req.clone({
            url: req.url,
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(req);
    }
}

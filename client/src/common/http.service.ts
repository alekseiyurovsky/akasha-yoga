import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private jwt = '';
  private baseUrl = 'http://localhost:3000/'

  constructor(private client: HttpClient) {}

  public setToken(token: string) {this.jwt = token}
  public getToken(): string {return this.jwt}
  public url(url: string): string {return `${this.baseUrl}${url}`}

  public get<T>(url: string, body: any = {}, params: { [param: string]: any } = {}, options?: any): Observable<T> {
    return this.request<T>('get', url, body, params, options);
  }

  public post<T>(url: string, body: any = {}, params: { [param: string]: any } = {}, options?: any): Observable<T> {
    return this.request<T>('post', url, body, params, options);
  }

  public delete<T>(url: string, body: any = {}, params: { [param: string]: any } = {}, options?: any): Observable<T> {
    return this.request<T>('delete', url, body, params, options);
  }

  public patch<T>(url: string, body: any = {}, params: { [param: string]: any } = {}, options?: any): Observable<T> {
    return this.request<T>('patch', url, body, params, options);
  }

  private request<T>(
    method: string,
    url: string,
    body: any = {},
    params: { [param: string]: any } = {},
    options?: Record<string, any>
  ): Observable<T> {
    return this.client.request<T>(method, this.url(url), {...options, body, params});
  }
}

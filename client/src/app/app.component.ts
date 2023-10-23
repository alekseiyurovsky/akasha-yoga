import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomInterceptor} from "../common/custom.interceptor";
import {HeaderComponent} from "../common/header/header.component";

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule, HeaderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
  ],
  selector: 'fse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
}

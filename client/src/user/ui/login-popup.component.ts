import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {take} from 'rxjs';
import {DataService} from '../../common/data.service';
import {HttpService} from '../../common/http.service';
import {SignInResponse} from '../../common/model/User';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';
import {LocalStorageService} from "../../common/local-storage.service";

@Component({
  selector: 'fse-login-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [HttpClient],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends DynamicPopupContainerComponent {

  email = '';
  password = '';
  error = '';

  constructor(
      private httpService: HttpService,
      private dataService: DataService,
      private storage: LocalStorageService
  ) {
    super();
  }

  login() {
    this.error = '';
    this.httpService.post<SignInResponse>('api/auth/sign-in', {'email': this.email, 'password_hash': this.password}).pipe(
      take(1)
    ).subscribe(
      ({access_token, ...user}) => {
        this.httpService.setToken(access_token ?? '');
        this.storage.set(access_token);
        this.dataService.setUser(user);
        this.apply();
      },
      err => {
        this.error = err.error.message;
      }
    );
  }
}

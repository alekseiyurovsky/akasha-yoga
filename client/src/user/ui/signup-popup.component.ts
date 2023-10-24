import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {take} from 'rxjs';
import {DataService} from '../../common/data.service';
import {HttpService} from '../../common/http.service';
import {SignInResponse} from '../../common/model/User';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
  selector: 'fse-signup-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [HttpClient],
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.scss']
})
export class SignupPopupComponent extends DynamicPopupContainerComponent {

  email = '';
  password = '';
  passwordSecond = '';
  name = '';
  surname = '';
  error = '';
  success = '';

  invalidFields = new Map<string, boolean>();

  private emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

  constructor(
    private httpService: HttpService
  ) {
    super();
  }

  signup() {
    if (!this.validate()) {
      return;
    }
    this.error = '';
    this.invalidFields.clear();
    this.httpService.post<unknown>('api/auth/sign-up', {
      'email': this.email,
      'password_hash': this.password,
      'name': this.name,
      'surname': this.surname
    }).pipe(
      take(1)
    ).subscribe(
      resp => {
        this.apply();
      },
      err => {
        this.error = err.error.message;
      }
    );
  }

  getCLass(fieldName): string {
    return this.invalidFields.has(fieldName)? 'is-danger' : 'is-primary';
  }

  private validate(): boolean {
    if (!this.emailRegex.test(this.email)) {
      this.error = 'Lūdzu, pārbaudiet ievadīto informāciju';
      this.invalidFields.set('email', true);
      return false;
    }
    return true;
  }
}

import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {take} from 'rxjs';
import {HttpService} from '../../common/http.service';
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
        this.success = 'Konts veiksmīgi izveidots. Aizveriet dialogu un ielogojoties';
      },
      err => {
        this.error = err?.error.message;
      }
    );
  }

  getCLass(fieldName: string): string {
    return this.invalidFields.has(fieldName)? 'is-danger' : '';
  }

  private validate(): boolean {
    let isValid = true;
    if (!this.emailRegex.test(this.email)) {
      isValid = false;
      this.invalidFields.set('email', true);
    }

    if (!this.password || !this.passwordSecond || this.passwordSecond !== this.password) {
      isValid = false;
      this.invalidFields.set('password', true);
    }

    if (!this.name) {
      isValid = false;
      this.invalidFields.set('name', true);
    }

    if (!this.surname) {
      isValid = false;
      this.invalidFields.set('surname', true);
    }

    if (!isValid) {
      this.error = 'Lūdzu, pārbaudiet ievadīto informāciju';
    }
    return isValid;
  }
}

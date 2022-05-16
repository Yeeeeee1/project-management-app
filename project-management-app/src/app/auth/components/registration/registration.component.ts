/* eslint-disable comma-dangle */
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

import {
  PASSWORD_REG_EXP,
  ROUTH_PATHS,
} from 'src/app/shared/constants/constants';
import { TranslateVariablesService } from 'src/app/shared/translate-variables.service';
import { IRegForm } from '../../models/registration.model';
import { AuthService } from '../../services/auth.service';
import { HttpAuthService } from '../../services/http-auth.service';
import { confirmValidator, regExValidator } from '../../util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Input() formError: string = '';

  public errorRegMsg = new BehaviorSubject<string>('');

  public login = '../login';

  constructor(
   public translateService:TranslateVariablesService,
    private fb: FormBuilder,
    public httpAuthService: HttpAuthService,
    public authService: AuthService,
    public router: Router
  ) { }

  public regFields: IRegForm[] = [
    {
      id: 'name',
      // '{{name | translate}}',
      formControlName: 'name',
      name: 'name',
      type: 'text',
      messageError: {
        minLength: 'The name is too short',
        maxLength: 'The name is too long',
        required: 'Please, enter a name'
      },
    },
    {
      id: 'login',
      name: 'email',
      formControlName: 'login',
      type: 'text',
      messageError: {
        email: 'Please enter a valid email: example@email.com',
        required: 'Please enter a  email',
        userExists: 'user with this email already exists',
      },
    },
    {
      id: 'password',
      formControlName: 'password',
      name: 'password',
      type: 'password',
      messageError: {
        regEx:
          'Your password must be have at least 8 characters long, 1 uppercase, 1 lowercase character, 1 number, 1 special character, e.g., ! @ # ? ]',
        required: 'Please enter a password',
      },
    },
    {
      id: 'confirmPassword',
      formControlName: 'confirmPassword',
      name: 'confirm password',
      type: 'password',
      messageError: {
        confirm: "Passwords don't match",
        required: 'Please confirm a password',
      },
    },
  ];

  public reg = this.fb.group({
    name: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    login: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, regExValidator(PASSWORD_REG_EXP)]],
    confirmPassword: [null, [Validators.required, confirmValidator()]],
  });

  createErrorMessage(regField: IRegForm): string | undefined {
    let message: string | undefined;
    switch (true) {
      case !!this.reg?.get(regField.id)?.errors?.['required']:
        message = regField.messageError.required;
        break;
      case !!this.reg?.get(regField.id)?.errors?.['email']:
        message = regField.messageError.email;
        break;

      case !!this.reg?.get(regField.id)?.errors?.['regEx']:
        message = regField.messageError.regEx;
        break;
      case !!this.reg?.get(regField.formControlName)?.errors?.['confirm']:
        message = regField.messageError.confirm;

        break;
      default:
        message = '';
    }
    return message;
  }

  createUserRequest() {
    delete this.reg.value.confirmPassword;
    this.httpAuthService.createUser(this.reg.value).subscribe((user) => {
      if (typeof user === 'string') {
        this.errorRegMsg.next(user);
      } else {
        this.httpAuthService
          .login({
            login: this.reg.value.login,
            password: this.reg.value.password,
          })
          .subscribe((data) => {
            this.authService.updateToken(data.token);
            this.router.navigate([ROUTH_PATHS.BOARDS]);
            this.httpAuthService.getUserById(data.token).subscribe((item) => {
              localStorage.setItem('name', item.name || '');
              this.authService.name$.next(
                localStorage.getItem('name') as string
              );
            });
          });
      }
    });
  }
}

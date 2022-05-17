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
     public translate:TranslateService,
   public translateService:TranslateVariablesService,
    private fb: FormBuilder,
    public httpAuthService: HttpAuthService,
    public authService: AuthService,
    public router: Router
  ) { }

  public regFields: IRegForm[] = [
    {
      id: 'name',
      formControlName: 'name',
      name: 'name',
      type: 'text',
    },
    {
      id: 'login',
      name: 'login',
      formControlName: 'login',
      type: 'text',
    },
    {
      id: 'password',
      formControlName: 'password',
      name: 'password',
      type: 'password',
    },
    {
      id: 'confirmPassword',
      formControlName: 'confirmPassword',
      name: 'confirm password',
      type: 'password',
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

  createErrorMessage(regField: IRegForm, label:string): string | undefined {
    let message: string | undefined;
    switch (true) {
      case !!this.reg?.get(regField.id)?.errors?.['required']:
        this.translate.get('required_err', { label: (label === 'электронная почта' ? 'электронную почту' : label) }).subscribe((val) => { message = val; });
        break;
      case !!this.reg?.get(regField.id)?.errors?.['email']:
        this.translate.get('email_err').subscribe((val) => { message = val; });
        break;

      case !!this.reg?.get(regField.id)?.errors?.['regEx']:
        this.translate.get('regEx_err').subscribe((val) => { message = val; });
        break;
      case !!this.reg?.get(regField.formControlName)?.errors?.['confirm']:
        this.translate.get('confirm_err').subscribe((val) => { message = val; }); break;
      case !!this.reg?.get(regField.id)?.errors?.['minlength']:
        this.translate.get('min_err').subscribe((val) => { message = val; });
        break;

      case !!this.reg?.get(regField.id)?.errors?.['maxlength']:
        this.translate.get('max_err').subscribe((val) => { message = val; });

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

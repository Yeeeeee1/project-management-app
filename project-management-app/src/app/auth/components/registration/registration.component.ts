/* eslint-disable comma-dangle */
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD_REG_EX, ROUTH_PATHS } from 'src/app/shared/constants/constants';
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

  public login = '../login';

  constructor(
    private fb: FormBuilder,
    public httpAuthService: HttpAuthService,
    public authService:AuthService,
    public router: Router
  ) {}

  public regFields: IRegForm[] = [
    {
      id: 'name',
      formControlName: 'name',
      name: 'name',
      type: 'text',
      messageError: {
        minLength: 'The name is too short',
        maxLength: 'The name is too long',
        required: 'Please enter a name',
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
    password: [null, [Validators.required, regExValidator(PASSWORD_REG_EX)]],
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
    this.httpAuthService
      .createUser(this.reg.value)
      .subscribe((user) => this.httpAuthService
        .login({ login: this.reg.value.login, password: this.reg.value.password })
        .subscribe((data) => {
          this.authService.updateToken(data.token);
          this.router.navigate([ROUTH_PATHS.BOARDS]);
        }));
  }
}

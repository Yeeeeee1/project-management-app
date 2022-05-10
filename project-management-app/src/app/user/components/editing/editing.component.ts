import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { HttpAuthService } from 'src/app/auth/services/http-auth.service';
import { confirmValidator, regExValidator } from 'src/app/auth/util';
import {
  PASSWORD_REG_EXP,
  ROUTH_PATHS,
} from 'src/app/shared/constants/constants';
import { AppStateService } from 'src/app/shared/services/app-state.service';
import { IEditForm } from '../../models/editing.model';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss'],
})
export class EditingComponent {
  public errorUpdateMsg = new BehaviorSubject('');

  public userId = '';

  public jwtHelper: JwtHelperService;

  constructor(
    public route: Router,
    private fb: FormBuilder,
    public httpAuthService: HttpAuthService,
    public appStateService: AppStateService
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  public formFields: IEditForm[] = [
    {
      id: 'name',
      label: 'Name',
      formControlName: 'name',
      type: 'text',
      messageError: {
        minLength: 'The name is too short',
        maxLength: 'The name is too long',
      },
    },
    {
      id: 'login',
      label: 'Email',
      formControlName: 'email',
      type: 'text',
      messageError: {
        email: 'Please enter a valid email: example@email.com',
      },
    },
    {
      id: 'password',
      label: 'Password',
      formControlName: 'password',
      type: 'password',
      messageError: {
        regEx:
          'Your password must be have at least 8 characters long, 1 uppercase, 1 lowercase character, 1 number, 1 special character, e.g., ! @ # ? ]',
        required: 'Please enter a password',
      },
    },
    {
      id: 'confirmPassword',
      label: 'Confirm password',
      formControlName: 'confirmPassword',
      type: 'password',
      messageError: {
        confirm: "Passwords don't match",
        required: 'Please confirm a password',
      },
    },
  ];

  public editForm = this.fb.group({
    name: [null, [Validators.minLength(3), Validators.maxLength(20)]],
    login: [null, [Validators.email]],
    password: [null, [regExValidator(PASSWORD_REG_EXP)]],
    confirmPassword: [null, [confirmValidator()]],
  });

  createErrorMessage(regField: IEditForm): string | undefined {
    let message: string | undefined;
    switch (true) {
      case !!this.editForm?.get(regField.id)?.errors?.['required']:
        message = regField.messageError.required;
        break;
      case !!this.editForm?.get(regField.id)?.errors?.['email']:
        message = regField.messageError.email;
        break;

      case !!this.editForm?.get(regField.id)?.errors?.['regEx']:
        message = regField.messageError.regEx;
        break;
      case !!this.editForm?.get(regField.id)?.errors?.['confirm']:
        message = regField.messageError.confirm;

        break;
      default:
        message = '';
    }
    return message;
  }

  updateUser() {
    delete this.editForm.value.confirmPassword;

    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('token') as string
    ).userId;
    this.httpAuthService
      .upDateUser(this.editForm.value, this.userId)
      .subscribe((user) => {
        if (typeof user === 'string') {
          this.errorUpdateMsg.next(user);
        } else {
          this.errorUpdateMsg.next('User updated!');
        }
      });
  }

  deleteUser() {
    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('token') as string
    ).userId;
    this.httpAuthService
      .deleteUser(this.userId)
      .subscribe((data) => console.log(data));
    localStorage.clear();
    this.route.navigate([ROUTH_PATHS.WELCOME]);
  }
}

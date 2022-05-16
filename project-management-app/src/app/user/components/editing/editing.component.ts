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
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { IEditForm } from '../../models/editing.model';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss'],
})
export class EditingComponent {
  public errorUpdateMsg = new BehaviorSubject('');

  public userId = '';

  public userEdited = false;

  public jwtHelper: JwtHelperService;

  public required = '';

  constructor(
    public translate:TranslateService,
    public location: Location,
    public route: Router,
    private fb: FormBuilder,
    public httpAuthService: HttpAuthService,
    public authService: AuthService,
    public appStateService: AppStateService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  public formFields: IEditForm[] = [
    {
      id: 'name',
      label: 'name',
      formControlName: 'name',
      type: 'text',
      messageError: {
        minLength: 'The name is too short',
        maxLength: 'The name is too long',

      },
    },
    {
      id: 'login',
      label: 'email',
      formControlName: 'email',
      type: 'text',
      messageError: {
        required: 'Please enter a  email',
        email: 'Please enter a valid email: example@email.com',
      },
    },
    {
      id: 'password',
      label: 'password',
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
    name: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    login: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, regExValidator(PASSWORD_REG_EXP)]],
    confirmPassword: [null, [Validators.required, confirmValidator()]],
  });

  createErrorMessage(regField: IEditForm): string | undefined {
    let message: string | undefined;
    switch (true) {
      case !!this.editForm?.get(regField.id)?.errors?.['required']:
        this.translate.get('required', { label: regField.label }).subscribe((val) => { message = val; });
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
      localStorage.getItem('token') as string,
    ).userId;
    localStorage.setItem('name', this.editForm.value.name);
    this.authService.name$.next(localStorage.getItem('name') as string);
    this.httpAuthService
      .upDateUser(this.editForm.value, this.userId)
      .subscribe((user) => {
        if (typeof user === 'string') {
          this.errorUpdateMsg.next(user);
        } else {
          this.userEdited = true;
        }
      });
  }

  goBack() {
    this.location.back();
    this.userEdited = false;
  }
}

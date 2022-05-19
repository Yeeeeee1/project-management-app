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
import { MatLabel } from '@angular/material/form-field';
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
    },
    {
      id: 'login',
      label: 'login',
      formControlName: 'email',
      type: 'text',
    },
    {
      id: 'password',
      label: 'password',
      formControlName: 'password',
      type: 'password',
    },
    {
      id: 'confirmPassword',
      label: 'confirm password',
      formControlName: 'confirmPassword',
      type: 'password',
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

  createErrorMessage(regField: IEditForm, label:string): string | undefined {
    let message: string | undefined;
    switch (true) {
      case !!this.editForm?.get(regField.id)?.errors?.['required']:
        this.translate.get('required_error', { label: (label === 'электронная почта' ? 'электронную почту' : label) }).subscribe((val) => { message = val; });
        break;
      case !!this.editForm?.get(regField.id)?.errors?.['email']:
        this.translate.get('email_error').subscribe((val) => { message = val; });
        break;

      case !!this.editForm?.get(regField.id)?.errors?.['regEx']:
        this.translate.get('regEx_error').subscribe((val) => { message = val; });
        break;
      case !!this.editForm?.get(regField.id)?.errors?.['confirm']:
        this.translate.get('confirm_error').subscribe((val) => { message = val; }); break;
      case !!this.editForm?.get(regField.id)?.errors?.['minlength']:
        this.translate.get('min_error').subscribe((val) => { message = val; });
        break;

      case !!this.editForm?.get(regField.id)?.errors?.['maxlength']:
        this.translate.get('max_error').subscribe((val) => { message = val; });
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

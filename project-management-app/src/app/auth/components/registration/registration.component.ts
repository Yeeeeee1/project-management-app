import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PASSWORD_REG_EX } from 'src/app/shared/constants/constants';
import { IRegForm } from '../../models/registration.model';
import { confirmValidator, regExValidator } from '../../util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Input() formError: string = '';

  constructor(private fb: FormBuilder) {}

  public regFields: IRegForm[] = [
    {
      id: 'name',
      formControlName: 'name',
      type: 'text',
      messageError: {
        minLength: 'The name is too short',
        maxLength: 'The name is too long',
        required: 'Please enter a name',
      },
    },
    {
      id: 'email',
      formControlName: 'email',
      type: 'text',
      messageError: {
        email: 'Please enter a valid email: example@email.com',
        required: 'Please enter a  email',
      },
    },
    {
      id: 'password',
      formControlName: 'password',
      type: 'password',
      messageError: {
        regEx:
          'Your password must be have at least 8 characters long, 1 uppercase, 1 lowercase character, 1 number, 1 special character, e.g., ! @ # ? ]',
        required: 'Please enter a password',
      },
    },
    {
      id: 'confirm Password',
      formControlName: 'confirmPassword',
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
    email: [null, [Validators.required, Validators.email]],
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
}

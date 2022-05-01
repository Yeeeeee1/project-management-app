import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { regExValidator } from 'src/app/auth/util';
import { PASSWORD_REG_EX } from 'src/app/shared/constants/constants';
import { IEditForm } from '../../models/editing.model';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent{

  constructor(private fb: FormBuilder) {}

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
      id: 'email',
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
    name: [null,[Validators.minLength(3), Validators.maxLength(20)],],
    email: [null, [Validators.email]],
    password: [null, [regExValidator(PASSWORD_REG_EX)]],
    //confirmPassword: [null, [confirmValidator()]],
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

}


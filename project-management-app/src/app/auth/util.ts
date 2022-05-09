import {
  AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { HttpAuthService } from './services/http-auth.service';

export function regExValidator(regEx: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const valid = !control.value || regEx.test(control.value);
    return valid ? null : { regEx: 'true' };
  };
}
export function confirmValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const valid = !!(control.value === control.parent?.get('password')?.value);
    return valid ? null : { confirm: 'true' };
  };
}
export function checkUserValidator(service:HttpAuthService):AsyncValidatorFn {
  return (control:AbstractControl) => {
   return service.createUser(control.value).pipe()};
}

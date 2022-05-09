import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
// export function checkUserValidator(control:AbstractControl):Observable<ValidationErrors | null> {
//   // eslint-disable-next-line max-len
//   return this.createUser(control.value).pipe(tap((response) => (response ? null : { user: true })));
// }

import {
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';


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

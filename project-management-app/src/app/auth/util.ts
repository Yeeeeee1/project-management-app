import { AbstractControl, ValidatorFn } from '@angular/forms';

export function regExValidator(regEx: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    let valid = !control.value || regEx.test(control.value);
    return valid ? null : { regEx: 'true' };
  };
}

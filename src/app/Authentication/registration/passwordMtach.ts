import { AbstractControl } from '@angular/forms';

export function passwordMatch(password: string, coPassword: string) {
  return function (from: AbstractControl) {
    const passwordValue: string = from.get(password)?.value;
    const coPasswordValue: string = from.get(coPassword)?.value;

    if (passwordValue === coPasswordValue) {
      return null
    } else {
      return { passwordMismatchError: true }
    }
  };
}

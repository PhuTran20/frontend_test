import { AbstractControl, ValidationErrors } from '@angular/forms';
import { emailRegex } from '../../data-access/constants/email-regex.const';

export function validateUsername(
  usernameControl: AbstractControl
): ValidationErrors | null {
  const value = usernameControl.value;
  const email = new RegExp(emailRegex);
  if (value && !email.test(value)) {
    return {
      userNamePattern: true,
    };
  }

  return null;
}

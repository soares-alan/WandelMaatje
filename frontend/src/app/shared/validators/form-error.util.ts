import { AbstractControl } from '@angular/forms';

import { getValidationMessage, ValidationMessage } from './validation-messages';

/** Errors must only be shown once the user has interacted with the field. */
export function shouldShowError(control: AbstractControl | null): boolean {
  return !!control && control.invalid && (control.touched || control.dirty);
}

export function resolveFormErrorMessage(control: AbstractControl | null): ValidationMessage | null {
  if (!control || !shouldShowError(control)) {
    return null;
  }

  return getValidationMessage(control.errors);
}

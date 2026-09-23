import { ValidationErrors } from '@angular/forms';

export interface ValidationMessage {
  key: string;
  params?: Record<string, unknown>;
}

/**
 * Maps a control's ValidationErrors to a single translation key + params,
 * following a fixed priority so only one message is shown at a time.
 */
export function getValidationMessage(errors: ValidationErrors | null): ValidationMessage | null {
  if (!errors) {
    return null;
  }

  if (errors['required']) {
    return { key: 'VALIDATION.REQUIRED' };
  }

  if (errors['email']) {
    return { key: 'VALIDATION.EMAIL' };
  }

  if (errors['min']) {
    return { key: 'VALIDATION.MIN', params: { min: errors['min'].min } };
  }

  if (errors['max']) {
    return { key: 'VALIDATION.MAX', params: { max: errors['max'].max } };
  }

  if (errors['minlength']) {
    return { key: 'VALIDATION.MIN_LENGTH', params: { requiredLength: errors['minlength'].requiredLength } };
  }

  if (errors['maxlength']) {
    return { key: 'VALIDATION.MAX_LENGTH', params: { requiredLength: errors['maxlength'].requiredLength } };
  }

  return null;
}

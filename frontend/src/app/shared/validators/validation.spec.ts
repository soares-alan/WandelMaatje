import { FormControl } from '@angular/forms';

import { resolveFormErrorMessage, shouldShowError } from './form-error.util';
import { getValidationMessage } from './validation-messages';

describe('getValidationMessage', () => {
  it('returns null when there are no errors', () => {
    expect(getValidationMessage(null)).toBeNull();
  });

  it('maps a required error', () => {
    expect(getValidationMessage({ required: true })).toEqual({ key: 'VALIDATION.REQUIRED' });
  });

  it('maps an email error', () => {
    expect(getValidationMessage({ email: true })).toEqual({ key: 'VALIDATION.EMAIL' });
  });

  it('maps a min error with params', () => {
    expect(getValidationMessage({ min: { min: 60, actual: 10 } })).toEqual({
      key: 'VALIDATION.MIN',
      params: { min: 60 }
    });
  });

  it('maps a max error with params', () => {
    expect(getValidationMessage({ max: { max: 120, actual: 200 } })).toEqual({
      key: 'VALIDATION.MAX',
      params: { max: 120 }
    });
  });

  it('maps a minlength error with params', () => {
    expect(getValidationMessage({ minlength: { requiredLength: 3, actualLength: 1 } })).toEqual({
      key: 'VALIDATION.MIN_LENGTH',
      params: { requiredLength: 3 }
    });
  });

  it('maps a maxlength error with params', () => {
    expect(getValidationMessage({ maxlength: { requiredLength: 500, actualLength: 600 } })).toEqual({
      key: 'VALIDATION.MAX_LENGTH',
      params: { requiredLength: 500 }
    });
  });

  it('prioritizes required over other errors', () => {
    expect(getValidationMessage({ required: true, min: { min: 60, actual: 10 } })).toEqual({
      key: 'VALIDATION.REQUIRED'
    });
  });
});

describe('shouldShowError / resolveFormErrorMessage', () => {
  it('does not show an error on a pristine, untouched invalid control', () => {
    const control = new FormControl('', { validators: (c) => (c.value ? null : { required: true }) });

    expect(shouldShowError(control)).toBeFalse();
    expect(resolveFormErrorMessage(control)).toBeNull();
  });

  it('shows an error once the control is touched', () => {
    const control = new FormControl('', { validators: (c) => (c.value ? null : { required: true }) });
    control.markAsTouched();

    expect(shouldShowError(control)).toBeTrue();
    expect(resolveFormErrorMessage(control)).toEqual({ key: 'VALIDATION.REQUIRED' });
  });

  it('shows an error once the control is dirty', () => {
    const control = new FormControl('', { validators: (c) => (c.value ? null : { required: true }) });
    control.markAsDirty();

    expect(shouldShowError(control)).toBeTrue();
    expect(resolveFormErrorMessage(control)).toEqual({ key: 'VALIDATION.REQUIRED' });
  });

  it('returns false/null for a null control', () => {
    expect(shouldShowError(null)).toBeFalse();
    expect(resolveFormErrorMessage(null)).toBeNull();
  });
});

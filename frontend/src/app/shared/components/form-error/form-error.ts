import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';

import { resolveFormErrorMessage } from '../../validators/form-error.util';

/**
 * Reusable validation-error renderer: drop inside a <mat-form-field> in place
 * of a hand-written `@if (control.hasError(...))` block per field.
 */
@Component({
  selector: 'app-form-error',
  imports: [MatError, TranslatePipe],
  template: `
    @if (message(); as message) {
      <mat-error>{{ message.key | translate: message.params }}</mat-error>
    }
  `
})
export class FormErrorComponent {
  readonly control = input.required<AbstractControl | null>();

  protected message() {
    return resolveFormErrorMessage(this.control());
  }
}

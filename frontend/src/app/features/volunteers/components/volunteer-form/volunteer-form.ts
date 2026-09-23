import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { Volunteer, VolunteerRequest } from '../../../../core/models/volunteer.model';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-volunteer-form',
  imports: [ReactiveFormsModule, TranslatePipe, FormErrorComponent, AutofocusDirective, ...MATERIAL_IMPORTS],
  templateUrl: './volunteer-form.html',
  styleUrl: './volunteer-form.scss'
})
export class VolunteerFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly initialValue = input<Volunteer | null>(null);
  readonly saving = input(false);
  readonly formSubmit = output<VolunteerRequest>();

  protected readonly form = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  });

  constructor() {
    effect(() => {
      const volunteer = this.initialValue();
      if (volunteer) {
        this.form.patchValue({ name: volunteer.name });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.formSubmit.emit({ name: value.name.trim() });
  }
}

import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { Elderly, ElderlyRequest } from '../../../../core/models/elderly.model';
import { MobilityLevel } from '../../../../core/models/mobility-level.model';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-elderly-form',
  imports: [ReactiveFormsModule, TranslatePipe, FormErrorComponent, AutofocusDirective, ...MATERIAL_IMPORTS],
  templateUrl: './elderly-form.html',
  styleUrl: './elderly-form.scss'
})
export class ElderlyFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly initialValue = input<Elderly | null>(null);
  readonly saving = input(false);
  readonly formSubmit = output<ElderlyRequest>();

  protected readonly mobilityLevels: MobilityLevel[] = ['LOW', 'MEDIUM', 'HIGH'];

  protected readonly form = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    age: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(60), Validators.max(120)]),
    mobilityLevel: this.formBuilder.nonNullable.control<MobilityLevel>('LOW', Validators.required),
    notes: this.formBuilder.nonNullable.control('', Validators.maxLength(500))
  });

  constructor() {
    effect(() => {
      const elderly = this.initialValue();
      if (elderly) {
        this.form.patchValue({
          name: elderly.name,
          age: elderly.age,
          mobilityLevel: elderly.mobilityLevel,
          notes: elderly.notes ?? ''
        });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.formSubmit.emit({
      name: value.name.trim(),
      age: value.age as number,
      mobilityLevel: value.mobilityLevel,
      notes: value.notes.trim() === '' ? null : value.notes
    });
  }

  protected mobilityLabelKey(level: MobilityLevel): string {
    return `FORM.ELDERLY_MOBILITY_${level}`;
  }
}

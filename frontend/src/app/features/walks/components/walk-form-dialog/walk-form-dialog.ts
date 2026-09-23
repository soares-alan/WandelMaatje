import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

import { Elderly } from '../../../../core/models/elderly.model';
import { Volunteer } from '../../../../core/models/volunteer.model';
import { WalkRequest } from '../../../../core/models/walk.model';
import { ElderlyService } from '../../../../core/services/elderly.service';
import { VolunteerService } from '../../../../core/services/volunteer.service';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { WalkFormDialogData } from './walk-form-dialog.types';

// Backend stores painMood as an integer 1-5; the label comes from a translation key.
const PAIN_MOOD_OPTIONS: readonly { value: number; labelKey: string }[] = [
  { value: 1, labelKey: 'FORM.WALK_PAIN_MOOD_1' },
  { value: 2, labelKey: 'FORM.WALK_PAIN_MOOD_2' },
  { value: 3, labelKey: 'FORM.WALK_PAIN_MOOD_3' },
  { value: 4, labelKey: 'FORM.WALK_PAIN_MOOD_4' },
  { value: 5, labelKey: 'FORM.WALK_PAIN_MOOD_5' }
];


@Component({
  selector: 'app-walk-form-dialog',
  imports: [ReactiveFormsModule, TranslatePipe, FormErrorComponent, AutofocusDirective, ...MATERIAL_IMPORTS],
  templateUrl: './walk-form-dialog.html',
  styleUrl: './walk-form-dialog.scss'
})
export class WalkFormDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<WalkFormDialogComponent, WalkRequest>);
  protected readonly data = inject<WalkFormDialogData>(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  private readonly elderlyService = inject(ElderlyService);
  private readonly volunteerService = inject(VolunteerService);

  protected readonly isEditMode = !!this.data.walk;
  protected readonly painMoodOptions = PAIN_MOOD_OPTIONS;
  protected readonly elderlyOptions = signal<Elderly[]>([]);
  protected readonly volunteerOptions = signal<Volunteer[]>([]);
  protected readonly loadingOptions = signal(true);

  protected readonly form = this.formBuilder.group({
    elderlyId: [this.data.walk?.elderly.id ?? null, Validators.required],
    volunteerId: [this.data.walk?.volunteer.id ?? null, Validators.required],
    walkDate: [this.data.walk ? new Date(this.data.walk.walkDate) : null, Validators.required],
    durationMinutes: [
      this.data.walk?.durationMinutes ?? null,
      [Validators.required, Validators.min(15), Validators.max(300)]
    ],
    distanceKm: [this.data.walk?.distanceKm ?? null, [Validators.required, Validators.min(0.1)]],
    painMood: [this.data.walk?.painMood ?? null, Validators.required],
    notes: [this.data.walk?.notes ?? '', Validators.maxLength(500)]
  });

  ngOnInit(): void {
    this.loadOptions();
      console.log('FORM VALID?', this.form.valid);
  console.log('FORM ERRORS', this.form.errors);
  }

  private loadOptions(): void {
    this.loadingOptions.set(true);

    forkJoin({
      elderly: this.elderlyService.getAll({ size: 100 }),
      volunteers: this.volunteerService.getAll({ size: 100 })
    }).subscribe({
      next: ({ elderly, volunteers }) => {
        this.elderlyOptions.set(elderly.content);
        this.volunteerOptions.set(volunteers.content);
        this.loadingOptions.set(false);
      },
      error: () => {
        this.loadingOptions.set(false);
      }
    });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
      console.log(this.form.getRawValue());
console.log(this.form.valid);
console.log(this.form.controls);
    }

    const value = this.form.getRawValue();
    const notes = value.notes?.trim();

    this.dialogRef.close({
      elderlyId: value.elderlyId as number,
      volunteerId: value.volunteerId as number,
      walkDate: this.formatDate(value.walkDate as Date),
      durationMinutes: value.durationMinutes as number,
      distanceKm: value.distanceKm as number,
      painMood: value.painMood as number,
      notes: notes ? notes : null
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
}

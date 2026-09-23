import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Volunteer, VolunteerRequest } from '../../../../core/models/volunteer.model';
import { VolunteerService } from '../../../../core/services/volunteer.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { VolunteerFormComponent } from '../../components/volunteer-form/volunteer-form';

@Component({
  selector: 'app-volunteer-edit',
  imports: [VolunteerFormComponent, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './volunteer-edit.html',
  styleUrl: './volunteer-edit.scss'
})
export class VolunteerEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly volunteerService = inject(VolunteerService);
  private readonly notification = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  private volunteerId!: number;

  protected readonly volunteer = signal<Volunteer | null>(null);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.volunteerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadVolunteer();
  }

  private loadVolunteer(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.volunteerService.getById(this.volunteerId).subscribe({
      next: (volunteer) => {
        this.volunteer.set(volunteer);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('VOLUNTEER.EDIT_LOAD_ERROR'));
        this.loading.set(false);
      }
    });
  }

  protected save(payload: VolunteerRequest): void {
    this.saving.set(true);

    this.volunteerService.update(this.volunteerId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.notification.success(this.translate.instant('MESSAGE.VOLUNTEER_UPDATE_SUCCESS'));
        this.router.navigate(['/volunteers']);
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}

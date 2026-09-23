import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { VolunteerRequest } from '../../../../core/models/volunteer.model';
import { VolunteerService } from '../../../../core/services/volunteer.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { VolunteerFormComponent } from '../../components/volunteer-form/volunteer-form';

@Component({
  selector: 'app-volunteer-create',
  imports: [VolunteerFormComponent, TranslatePipe],
  templateUrl: './volunteer-create.html',
  styleUrl: './volunteer-create.scss'
})
export class VolunteerCreateComponent {
  private readonly volunteerService = inject(VolunteerService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  protected readonly saving = signal(false);

  protected save(payload: VolunteerRequest): void {
    this.saving.set(true);

    this.volunteerService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.notification.success(this.translate.instant('MESSAGE.VOLUNTEER_CREATE_SUCCESS'));
        this.router.navigate(['/volunteers']);
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { ElderlyRequest } from '../../../../core/models/elderly.model';
import { ElderlyService } from '../../../../core/services/elderly.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ElderlyFormComponent } from '../../components/elderly-form/elderly-form';

@Component({
  selector: 'app-elderly-create',
  imports: [ElderlyFormComponent, TranslatePipe],
  templateUrl: './elderly-create.html',
  styleUrl: './elderly-create.scss'
})
export class ElderlyCreateComponent {
  private readonly elderlyService = inject(ElderlyService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  protected readonly saving = signal(false);

  protected save(payload: ElderlyRequest): void {
    this.saving.set(true);

    this.elderlyService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.notification.success(this.translate.instant('MESSAGE.ELDERLY_CREATE_SUCCESS'));
        this.router.navigate(['/elderlies']);
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}

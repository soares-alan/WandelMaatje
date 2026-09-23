import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Elderly, ElderlyRequest } from '../../../../core/models/elderly.model';
import { ElderlyService } from '../../../../core/services/elderly.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { ElderlyFormComponent } from '../../components/elderly-form/elderly-form';

@Component({
  selector: 'app-elderly-edit',
  imports: [ElderlyFormComponent, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './elderly-edit.html',
  styleUrl: './elderly-edit.scss'
})
export class ElderlyEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly elderlyService = inject(ElderlyService);
  private readonly notification = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  private elderlyId!: number;

  protected readonly elderly = signal<Elderly | null>(null);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.elderlyId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadElderly();
  }

  private loadElderly(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.elderlyService.getById(this.elderlyId).subscribe({
      next: (elderly) => {
        this.elderly.set(elderly);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('ELDERLY.EDIT_LOAD_ERROR'));
        this.loading.set(false);
      }
    });
  }

  protected save(payload: ElderlyRequest): void {
    this.saving.set(true);

    this.elderlyService.update(this.elderlyId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.notification.success(this.translate.instant('MESSAGE.ELDERLY_UPDATE_SUCCESS'));
        this.router.navigate(['/elderlies']);
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}

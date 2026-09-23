import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Elderly } from '../../../../core/models/elderly.model';
import { ElderlyService } from '../../../../core/services/elderly.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import {
  DeleteConfirmDialogComponent,
  DeleteConfirmDialogData
} from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog';

@Component({
  selector: 'app-elderly-list',
  imports: [RouterLink, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './elderly-list.html',
  styleUrl: './elderly-list.scss'
})
export class ElderlyListComponent implements OnInit {
  private readonly elderlyService = inject(ElderlyService);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  protected readonly displayedColumns = ['id', 'name', 'age', 'mobilityLevel', 'notes', 'actions'] as const;
  protected readonly elderly = signal<Elderly[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly isEmpty = computed(
    () => !this.loading() && !this.errorMessage() && this.elderly().length === 0
  );

  ngOnInit(): void {
    this.loadElderly();
  }

  protected loadElderly(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.elderlyService.getAll({ size: 100 }).subscribe({
      next: (response) => {
        this.elderly.set(response.content);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('ELDERLY.LIST_ERROR'));
        this.loading.set(false);
      }
    });
  }

  protected editElderly(elderly: Elderly): void {
    this.router.navigate(['/elderlies', elderly.id, 'edit']);
  }

  protected deleteElderly(elderly: Elderly): void {
    const data: DeleteConfirmDialogData = {
      title: this.translate.instant('MESSAGE.ELDERLY_DELETE_TITLE'),
      message: this.translate.instant('MESSAGE.ELDERLY_DELETE_CONFIRM', { name: elderly.name })
    };

    this.dialog
      .open(DeleteConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.elderlyService.delete(elderly.id).subscribe({
          next: () => {
            this.notification.success(this.translate.instant('MESSAGE.ELDERLY_DELETE_SUCCESS'));
            this.loadElderly();
          }
        });
      });
  }
}

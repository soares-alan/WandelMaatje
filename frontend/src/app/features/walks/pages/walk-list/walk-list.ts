import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Walk, WalkRequest } from '../../../../core/models/walk.model';
import { WalkService } from '../../../../core/services/walk.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import {
  DeleteConfirmDialogComponent,
  DeleteConfirmDialogData
} from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog';
import { WalkFormDialogComponent } from '../../components/walk-form-dialog/walk-form-dialog';
import { WalkFormDialogData } from '../../components/walk-form-dialog/walk-form-dialog.types';

@Component({
  selector: 'app-walk-list',
  imports: [DatePipe, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './walk-list.html',
  styleUrl: './walk-list.scss'
})
export class WalkListComponent implements OnInit {
  private readonly walkService = inject(WalkService);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  protected readonly displayedColumns = [
    'id',
    'elderly',
    'volunteer',
    'walkDate',
    'durationMinutes',
    'painMood',
    'actions'
  ] as const;
  protected readonly walks = signal<Walk[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly isEmpty = computed(
    () => !this.loading() && !this.errorMessage() && this.walks().length === 0
  );

  ngOnInit(): void {
    this.loadWalks();
  }

  protected loadWalks(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.walkService.getAll({ size: 100 }).subscribe({
      next: (response) => {
        this.walks.set(response.content);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('WALK.LIST_ERROR'));
        this.loading.set(false);
      }
    });
  }

  protected openCreateDialog(): void {
    this.openFormDialog({});
  }

  protected openEditDialog(walk: Walk): void {
    this.openFormDialog({ walk });
  }

  private openFormDialog(data: WalkFormDialogData): void {
    this.dialog
      .open(WalkFormDialogComponent, { data, width: '480px' })
      .afterClosed()
      .subscribe((payload?: WalkRequest) => {
        if (!payload) {
          return;
        }

        if (data.walk) {
          this.updateWalk(data.walk.id, payload);
        } else {
          this.createWalk(payload);
        }
      });
  }

  private createWalk(payload: WalkRequest): void {
    this.walkService.create(payload).subscribe({
      next: () => {
        this.notification.success(this.translate.instant('MESSAGE.WALK_CREATE_SUCCESS'));
        this.loadWalks();
      }
    });
  }

  private updateWalk(id: number, payload: WalkRequest): void {
    this.walkService.update(id, payload).subscribe({
      next: () => {
        this.notification.success(this.translate.instant('MESSAGE.WALK_UPDATE_SUCCESS'));
        this.loadWalks();
      }
    });
  }

  protected deleteWalk(walk: Walk): void {
    const data: DeleteConfirmDialogData = {
      title: this.translate.instant('MESSAGE.WALK_DELETE_TITLE'),
      message: this.translate.instant('MESSAGE.WALK_DELETE_CONFIRM', {
        elderly: walk.elderly.name,
        volunteer: walk.volunteer.name
      })
    };

    this.dialog
      .open(DeleteConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.walkService.delete(walk.id).subscribe({
          next: () => {
            this.notification.success(this.translate.instant('MESSAGE.WALK_DELETE_SUCCESS'));
            this.loadWalks();
          }
        });
      });
  }
}

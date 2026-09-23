import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Volunteer } from '../../../../core/models/volunteer.model';
import { VolunteerService } from '../../../../core/services/volunteer.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import {
  DeleteConfirmDialogComponent,
  DeleteConfirmDialogData
} from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog';

@Component({
  selector: 'app-volunteer-list',
  imports: [RouterLink, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './volunteer-list.html',
  styleUrl: './volunteer-list.scss'
})
export class VolunteerListComponent implements OnInit {
  private readonly volunteerService = inject(VolunteerService);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  protected readonly displayedColumns = ['id', 'name', 'actions'] as const;
  protected readonly volunteers = signal<Volunteer[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly isEmpty = computed(
    () => !this.loading() && !this.errorMessage() && this.volunteers().length === 0
  );

  ngOnInit(): void {
    this.loadVolunteers();
  }

  protected loadVolunteers(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.volunteerService.getAll({ size: 100 }).subscribe({
      next: (response) => {
        this.volunteers.set(response.content);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('VOLUNTEER.LIST_ERROR'));
        this.loading.set(false);
      }
    });
  }

  protected editVolunteer(volunteer: Volunteer): void {
    this.router.navigate(['/volunteers', volunteer.id, 'edit']);
  }

  protected deleteVolunteer(volunteer: Volunteer): void {
    const data: DeleteConfirmDialogData = {
      title: this.translate.instant('MESSAGE.VOLUNTEER_DELETE_TITLE'),
      message: this.translate.instant('MESSAGE.VOLUNTEER_DELETE_CONFIRM', { name: volunteer.name })
    };

    this.dialog
      .open(DeleteConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.volunteerService.delete(volunteer.id).subscribe({
          next: () => {
            this.notification.success(this.translate.instant('MESSAGE.VOLUNTEER_DELETE_SUCCESS'));
            this.loadVolunteers();
          }
        });
      });
  }
}

import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

import { Walk } from '../../../../core/models/walk.model';
import { ElderlyService } from '../../../../core/services/elderly.service';
import { VolunteerService } from '../../../../core/services/volunteer.service';
import { WalkService } from '../../../../core/services/walk.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

interface SummaryCard {
  titleKey: string;
  icon: string;
  count: number;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe, NgClass, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private readonly elderlyService = inject(ElderlyService);
  private readonly volunteerService = inject(VolunteerService);
  private readonly walkService = inject(WalkService);
  private readonly translate = inject(TranslateService);

  protected readonly recentWalksColumns = ['id', 'elderly', 'volunteer', 'walkDate', 'status'] as const;
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly elderlyCount = signal(0);
  protected readonly volunteerCount = signal(0);
  protected readonly walkCount = signal(0);
  protected readonly recentWalks = signal<Walk[]>([]);
  protected readonly isRecentWalksEmpty = computed(
    () => !this.loading() && !this.errorMessage() && this.recentWalks().length === 0
  );

  protected readonly summaryCards = computed<SummaryCard[]>(() => [
    { titleKey: 'HOME.SUMMARY_ELDERLIES', icon: 'elderly', count: this.elderlyCount(), colorClass: 'summary-card--elderly' },
    {
      titleKey: 'HOME.SUMMARY_VOLUNTEERS',
      icon: 'volunteer_activism',
      count: this.volunteerCount(),
      colorClass: 'summary-card--volunteer'
    },
    { titleKey: 'HOME.SUMMARY_WALKS', icon: 'directions_walk', count: this.walkCount(), colorClass: 'summary-card--walk' }
  ]);

  ngOnInit(): void {
    this.loadDashboard();
  }

  protected loadDashboard(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    forkJoin({
      elderly: this.elderlyService.getAll({ size: 1 }),
      volunteers: this.volunteerService.getAll({ size: 1 }),
      walks: this.walkService.getAll({ size: 1 }),
      recentWalks: this.walkService.getAll({ size: 5, sortBy: 'walkDate', direction: 'desc' })
    }).subscribe({
      next: ({ elderly, volunteers, walks, recentWalks }) => {
        this.elderlyCount.set(elderly.totalElements);
        this.volunteerCount.set(volunteers.totalElements);
        this.walkCount.set(walks.totalElements);
        this.recentWalks.set(recentWalks.content);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('HOME.ERROR'));
        this.loading.set(false);
      }
    });
  }

  // Walks have no persisted status in the backend; derive a display-only label from the date.
  protected getWalkStatus(walk: Walk): string {
    return new Date(walk.walkDate) <= new Date() ? 'HOME.STATUS_DONE' : 'HOME.STATUS_SCHEDULED';
  }
}

import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const DEFAULT_NOTIFICATION_CONFIG: MatSnackBarConfig = {
  duration: 5000,
  horizontalPosition: 'end',
  verticalPosition: 'top'
};

/** Provides a single, consistent entry point for application notifications. */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  private show(message: string, type: NotificationType): void {
    this.snackBar.open(message, this.translate.instant('MESSAGE.CLOSE'), {
      ...DEFAULT_NOTIFICATION_CONFIG,
      panelClass: [`notification--${type}`],
      politeness: type === 'error' ? 'assertive' : 'polite'
    });
  }
}

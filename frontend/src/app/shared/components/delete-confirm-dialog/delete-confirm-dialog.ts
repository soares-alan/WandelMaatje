import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import { MATERIAL_IMPORTS } from '../../material/material.imports';

export interface DeleteConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './delete-confirm-dialog.html',
  styleUrl: './delete-confirm-dialog.scss'
})
export class DeleteConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);
  protected readonly data = inject<DeleteConfirmDialogData>(MAT_DIALOG_DATA);

  protected cancel(): void {
    this.dialogRef.close(false);
  }

  protected confirm(): void {
    this.dialogRef.close(true);
  }
}

import { Component, inject, Input } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ErrorModalData } from '../../models/error.model';
@Component({
  selector: 'app-error-modal',
  imports: [MatDialogContent, MatDialogTitle, MatIconModule],
  templateUrl: './error-modal.html',
})

export class ErrorModal {

  data: ErrorModalData = inject(MAT_DIALOG_DATA);

  private readonly dialog = inject(MatDialogRef);

  get errorMessage(): string {
    return this.data?.errorMessage || 'An unexpected error occurred. Please try again later.';
  }
  
  get errorIcon(): string {
    return this.data?.errorIcon || 'error';
  }
  
  get errorTitle(): string {
    return this.data?.errorTitle || 'Error';
  }

  public close(): void {
    this.dialog.close();
  }
}

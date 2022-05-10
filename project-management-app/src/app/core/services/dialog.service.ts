import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../components/mat-dialog/mat-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(MatDialogComponent, {
      width: '380px',
      disableClose: true,
      panelClass: 'dialog-container',
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  title = 'A';
  message = 'Do you want to delete?';
  public id = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService
  ) {}

  onConfirm(): void {
    // Close the dialog, return true
    this.mainService.deleteBoard(this.id).subscribe(() => {
      this.mainService.getBoards().subscribe((data: any) => {
        this.mainService.showResults(data);
      });
    });
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

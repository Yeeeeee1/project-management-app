import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/main/services/main.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {

  title = '';

  constructor(
    public dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private mainService: MainService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  createBoard(): void {
    this.mainService.createBoard({ title: this.title });
    this.onCancel();
  }
}

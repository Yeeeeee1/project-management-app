import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {
  title = '';

  description = '';

  constructor(
    public dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private mainService: MainService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  createBoard(): void {
    this.mainService.createBoard({ title: this.title, description: this.description });
    this.onCancel();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-change-board-modal',
  templateUrl: './change-board-modal.component.html',
  styleUrls: ['./change-board-modal.component.scss'],
})
export class ChangeBoardModalComponent {
  public id = '';

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

  changeBoard(): void {
    this.mainService.changeName({ title: this.title, description: this.description }, this.id);
    this.onCancel();
  }
}

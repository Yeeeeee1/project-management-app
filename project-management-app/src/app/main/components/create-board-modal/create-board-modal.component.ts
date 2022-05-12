import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {
  id = '6';
  title = 'aaa';

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private mainService: MainService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  createBoard(): void {
    this.mainService
      .createBoard({ title: this.title })
      .subscribe((data: any) => {
        console.log(data);
        this.mainService
          .getBoards()
          .subscribe((data: any) => this.mainService.showResults(data));
      });
    this.onCancel();
  }
}

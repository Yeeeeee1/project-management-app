import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-column-creation',
  templateUrl: './column-creation.component.html',
  styleUrls: ['./column-creation.component.scss']
})
export class ColumnCreationComponent {
  constructor(
    public dialogRef: MatDialogRef<ColumnCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string},
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}

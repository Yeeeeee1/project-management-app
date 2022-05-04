import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnCreationComponent } from '../../components/column-creation/column-creation.component';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public name: string;

  constructor(public dialog: MatDialog) {}

  openCreateColumnForm(): void {
    const dialogRef = this.dialog.open(ColumnCreationComponent, {
      width: '400px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }
}



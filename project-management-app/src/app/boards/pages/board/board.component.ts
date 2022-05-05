import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnCreationComponent } from '../../components/column-creation/column-creation.component';
import { Column } from '../../models/column';
import { BoardsService } from '../../services/boards.service';
import { sortByOrderNumber } from '../../util';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public name: string;
  public columns: Column[];

  constructor(public dialog: MatDialog, private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.getColumns(this.setColumns);
  }

  openCreateColumnForm(): void {
    const dialogRef = this.dialog.open(ColumnCreationComponent, {
      width: '400px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  private setColumns = (columns: Column[]):void => {
    sortByOrderNumber(columns);
    this.columns = columns;
  };
}



import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
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

  constructor(public dialog: MatDialog, private boardsService: BoardsService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.boardsService.setBoardId(id);
    this.boardsService.getColumns(this.setColumns);
  }

  public goToMain(): void {
    this.router.navigate([ROUTH_PATHS.MAIN]);
  }

  openCreateColumnForm(): void {
    const dialogRef = this.dialog.open(ColumnCreationComponent, {
      width: '400px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;

      if(this.name !== undefined) {
        const successCallback = () => {
          this.router.navigateByUrl('/.', {skipLocationChange: true}).then(() => {
            this.router.navigate([ROUTH_PATHS.BOARD]);
          });
        };
        this.boardsService.createColumn(this.name, successCallback);
      }
    });
  }

  private setColumns = (columns: Column[]):void => {
    sortByOrderNumber(columns);
    this.columns = columns;
  };
}



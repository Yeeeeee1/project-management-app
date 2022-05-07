import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { ColumnCreationComponent } from '../../components/column-creation/column-creation.component';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { sortByOrderNumber } from '../../util';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public columns: Column[];
  private allColumnsSubs: Subscription;

  constructor(public dialog: MatDialog, private columnsService: ColumnsService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.columnsService.setIdBoard(id);
    this.columnsService.getColumns();
    this.allColumnsSubs = this.columnsService.columns$.subscribe(columns => {
      sortByOrderNumber(columns);
      this.columns = columns
    })
  }

  public goToMain(): void {
    this.router.navigate([ROUTH_PATHS.MAIN]);
  }

  openCreateColumnForm(): void {
    const dialogRef = this.dialog.open(ColumnCreationComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.columnsService.createColumn(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.allColumnsSubs.unsubscribe();
  }
}



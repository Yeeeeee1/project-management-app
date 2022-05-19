import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { MainService } from 'src/app/main/services/main.service';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { ColumnCreationComponent } from '../../components/column-creation/column-creation.component';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { sortByOrderNumber } from '../../util';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public columns: Column[];

  public boardName: string;

  private columnsSubs: Subscription;

  private boardSubs: Subscription;

  constructor(
    public dialog: MatDialog,
    private columnsService: ColumnsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.columnsService.setIdBoard(id);
    this.columnsService.getColumns();
    this.columnsSubs = this.columnsService.columns$
      .subscribe((columns) => {
        sortByOrderNumber(columns);
        this.columns = columns;
      });

    this.boardSubs = this.mainService
      .getBoardById(this.columnsService.getIdBoard()).subscribe((board) => {
        this.boardName = board.title;
      });
  }

  public goToMain(): void {
    this.router.navigate([ROUTH_PATHS.MAIN]);
  }

  openCreateColumnForm(): void {
    const dialogRef = this.dialog.open(ColumnCreationComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.columnsService.createColumn(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.columnsSubs.unsubscribe();
    this.boardSubs.unsubscribe();
  }

  createTask(): void {
    this.dialog.open(TaskModalComponent);
  }

  // drop(event: CdkDragDrop<Column[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       this.columns,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
}

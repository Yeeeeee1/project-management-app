import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { ModalComponent } from '../../../core/components/deletion-modal/deletion-modal.component';
import { ITask } from '../../models/task';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() public column: Column;

  @Input() public columns: Column[];

  public tasks: ITask[];

  public columnId :string | undefined;

  public showColumnTitle: boolean = true;

  public showTitleEditSection: boolean = false;

  constructor(
    public dialog: MatDialog,
    private columnsService: ColumnsService,
  ) {

  }

  ngOnInit(): void {
    this.columnsService.getColumn(this.column.id)
      .subscribe((column) => {
        this.tasks = (column.tasks as ITask[]); this.columnId = column.id;
      });
  }

  openDeleteModal() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.columnsService.deleteColumn(this.column.id);
      }
    });
  }

  public saveTitle(title: string):void {
    if (title !== '') {
      this.column.title = title;
      this.columnsService.updateColumn(this.column);
    }
    this.toggleTitleEditingSection();
  }

  public toggleTitleEditingSection(): void {
    this.showColumnTitle = !this.showColumnTitle;
    this.showTitleEditSection = !this.showColumnTitle;
  }

  public arrColor = ['#ee384b', '#d58d49', '#ffce00', '#538f51', '#435e85', '#800080'];

  public randomColor(i:number) {
    return i < 7 ? this.arrColor[i - 1] : this.arrColor[(i % 5) - 1];
  }

  drop(event: CdkDragDrop<ITask[]>) {
    console.log(event, 'task');
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        this.tasks,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

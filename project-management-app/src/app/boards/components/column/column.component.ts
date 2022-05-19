import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  public tasks: ITask[] | undefined;

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
      .subscribe((column) => { this.tasks = column.tasks; this.columnId = column.id; });
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
}

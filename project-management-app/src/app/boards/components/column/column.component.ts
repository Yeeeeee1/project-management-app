import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { ModalComponent } from '../../../core/components/deletion-modal/deletion-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() public column: Column;

  public showColumnTitle: boolean = true;

  public showTitleEditSection: boolean = false;

  constructor(
    public dialog: MatDialog,
    private columnsService: ColumnsService,
  ) {}

  openDeleteModal() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.columnsService.deleteColumn(this.column.id);
      }
    });
  }

  public openTitleEditingSection():void {
    this.showColumnTitle = false;
    this.showTitleEditSection = true;
  }

  public saveTitle(title: string):void {
    if(title !== '') {
      this.column.title = title;
      this.columnsService.updateColumn(this.column);
    }
    this.closeTitleEditingSection();
  }

  public closeTitleEditingSection(): void {
    this.showColumnTitle = true;
    this.showTitleEditSection = false;
  }
}

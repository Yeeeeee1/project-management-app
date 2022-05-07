import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { ModalComponent } from '../deletion-modal/deletion-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() public column: Column;

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
}

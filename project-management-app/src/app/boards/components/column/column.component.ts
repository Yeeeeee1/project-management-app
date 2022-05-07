import { Component, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { Column } from '../../models/column';
import { BoardsService } from '../../services/boards.service';
import { ModalComponent } from '../deletion-modal/deletion-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() public column: Column;

  constructor(public dialog: MatDialog, private boardsService: BoardsService, private router: Router) {}

  openDeleteModal() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      const successCallback = () => {
        this.router.navigateByUrl('/.', {skipLocationChange: true}).then(() => {
          this.router.navigate([ROUTH_PATHS.BOARD]);
        });
      };

      if(result) {
        this.boardsService.deleteColumn(this.column.id, successCallback);
      }
    });
  }
}

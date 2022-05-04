import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BoardsRoutingModule } from './boards-routing.module';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './pages/board/board.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BoardComponent, ColumnComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    BoardsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [],
})
export class BoardsModule {}

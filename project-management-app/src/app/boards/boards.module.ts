import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ColumnCreationComponent } from './components/column-creation/column-creation.component';
import { ModalComponent } from '../core/components/deletion-modal/deletion-modal.component';
import { BoardComponent } from './pages/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardsRoutingModule } from './boards-routing.module';

@NgModule({
  declarations: [BoardComponent, ColumnComponent, ModalComponent, ColumnCreationComponent],
  imports: [
    CommonModule,
    RouterModule,
    BoardsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    TranslateModule,
  ],
  exports: [],
})
export class BoardsModule {}

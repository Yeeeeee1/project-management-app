import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MainComponent } from './pages/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { CoreModule } from '../core/core.module';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ChangeBoardModalComponent } from './components/change-board-modal/change-board-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    CreateBoardModalComponent,
    ChangeBoardModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MainRoutingModule,
    CoreModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  exports: [],
})
export class MainModule {}

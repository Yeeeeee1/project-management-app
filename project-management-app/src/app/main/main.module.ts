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

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MainRoutingModule,
    CoreModule,
  ],
  exports: [],
})
export class MainModule {}

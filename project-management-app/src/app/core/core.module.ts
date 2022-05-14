import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
<<<<<<< HEAD
import { PageErrorComponent } from './pages/page-error/page-error.component';
=======
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
>>>>>>> bb43c90eafe6caa67fafb171364976d67968a3e3

@NgModule({
  declarations: [HeaderComponent, FooterComponent, WelcomeComponent, MatDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';

import { PageErrorComponent } from './pages/page-error/page-error.component';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; 


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MatDialogComponent,
    PageErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}

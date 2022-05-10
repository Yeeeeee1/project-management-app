import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { BoardsComponent } from './boards/components/boards/boards.component';
import { DialogService } from './core/services/dialog.service';
import { HeaderComponent } from './core/components/header/header.component';
import { MatDialogComponent } from './core/components/mat-dialog/mat-dialog.component';

export function getToken() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent, BoardsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    RouterModule,
    CoreModule,
    MatDialogModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      },
    }),

    HttpClientModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    DialogService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [HeaderComponent, MatDialogComponent],
})
export class AppModule {}

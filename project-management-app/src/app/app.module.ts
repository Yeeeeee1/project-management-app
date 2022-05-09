import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from './main/main.module';
import { PageErrorComponent } from './core/pages/page-error/page-error.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    RouterModule,
    CoreModule,
    HttpClientModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { HeaderComponent } from './core/components/header/header.component';

export function getToken() {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
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
    MatDialogModule,
    MatSelectModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      },
    }),

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),

    HttpClientModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },

  ],
  bootstrap: [AppComponent],
  entryComponents: [HeaderComponent],
})
export class AppModule {}

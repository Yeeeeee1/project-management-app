import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './pages/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageErrorComponent } from '../core/pages/page-error/page-error.component';
import { AuthRoutingModule } from './auth-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    PageErrorComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [],
})
export class AuthModule {}

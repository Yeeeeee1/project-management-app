import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user.component';
import { EditingComponent } from './components/editing/editing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserRoutingModule } from './user-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    UserComponent,
    EditingComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    UserRoutingModule,
    MatButtonModule
  ]
})
export class UserModule { }

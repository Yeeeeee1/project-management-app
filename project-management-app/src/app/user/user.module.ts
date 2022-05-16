import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UserRoutingModule } from './user-routing.module';
import { EditingComponent } from './components/editing/editing.component';
import { UserComponent } from './pages/user.component';

@NgModule({
  declarations: [
    UserComponent,
    EditingComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    UserRoutingModule,
    MatButtonModule,
     TranslateModule,
  ],
})
export class UserModule { }

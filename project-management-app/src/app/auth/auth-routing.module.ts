import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTH_PATHS } from '../shared/constants/constants';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthComponent } from './pages/auth.component';

const routes: Routes = [{ path: '', component: AuthComponent }, { path: 'login', component: LoginComponent }, { path: 'registration', component: RegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

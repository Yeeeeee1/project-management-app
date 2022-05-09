import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { PageErrorComponent } from './core/pages/page-error/page-error.component';
import { ROUTH_PATHS } from './shared/constants/constants';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { BoardsComponent } from './boards/components/boards/boards.component';

const routes: Routes = [
  { path: '', redirectTo: ROUTH_PATHS.BOARDS, pathMatch: 'full' },
  {
    path: ROUTH_PATHS.BOARDS,
    component: BoardsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTH_PATHS.EDIT_PROFILE,
    loadChildren: async (): Promise<UserModule> => import('./user/user.module').then((x) => x.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTH_PATHS.AUTHORIZATION,
    loadChildren: async (): Promise<AuthModule> => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  { path: ROUTH_PATHS.WELCOME, component: WelcomeComponent },
  { path: '**', component: PageErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

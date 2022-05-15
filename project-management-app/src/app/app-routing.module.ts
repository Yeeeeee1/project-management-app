import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { BoardsModule } from './boards/boards.module';
import { PageErrorComponent } from './core/pages/page-error/page-error.component';
import { ROUTH_PATHS } from './shared/constants/constants';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { BoardsComponent } from './boards/components/boards/boards.component';

const routes: Routes = [
  {
    path: ROUTH_PATHS.MAIN,
    loadChildren: async (): Promise<MainModule> => import('./main/main.module').then((x) => x.MainModule),
  },

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
  {
    path: ROUTH_PATHS.BOARD,
    loadChildren: async (): Promise<BoardsModule> => import('./boards/boards.module').then((x) => x.BoardsModule),
  },

  { path: '**', component: PageErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

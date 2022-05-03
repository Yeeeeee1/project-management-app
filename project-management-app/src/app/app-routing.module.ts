import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { PageErrorComponent } from './core/pages/page-error/page-error.component';
import { ROUTH_PATHS } from './shared/constants/constants';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: ROUTH_PATHS.EDIT_PROFILE,
    loadChildren: async (): Promise<UserModule> => import('./user/user.module').then((x) => x.UserModule),
  },
  {
    path: ROUTH_PATHS.AUTHORIZATION,
    loadChildren: async (): Promise<AuthModule> =>
      import('./auth/auth.module').then((x) => x.AuthModule),
  },
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

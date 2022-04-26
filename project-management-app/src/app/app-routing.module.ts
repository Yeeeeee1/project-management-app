import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PageErrorComponent } from './core/pages/page-error/page-error.component';
import { ROUTH_PATHS } from './shared/constants/constants';

const routes: Routes = [
  {
    path: ROUTH_PATHS.AUTHORIZATION,
    loadChildren: (): Promise<AuthModule> =>
      import('./auth/auth.module').then((x) => x.AuthModule),
  },

  { path: '**', component: PageErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

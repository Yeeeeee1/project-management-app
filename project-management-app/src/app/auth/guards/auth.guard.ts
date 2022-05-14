import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.expirationCounter();
    this.authService.isLogin$.subscribe((val) => { this.isAuth = val; });
  }

  canActivate(): boolean | Promise<boolean> {
    return this.isAuth ? true : this.router.navigate([ROUTH_PATHS.WELCOME]);
  }
}

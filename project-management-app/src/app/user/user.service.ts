import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/services/auth.service';
import { HttpAuthService } from '../auth/services/http-auth.service';
import { ROUTH_PATHS } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userId = '';

  public jwtHelper: JwtHelperService;

  constructor(
public authService: AuthService,
    public httpAuthService: HttpAuthService,
private router: Router,
  ) { this.jwtHelper = new JwtHelperService()}

  deleteUser() {
    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('token') as string,
    ).userId;
    this.httpAuthService.deleteUser(this.userId).subscribe();
    localStorage.clear();
    this.authService.isLogin$.next(false);
    this.router.navigate([ROUTH_PATHS.WELCOME]);
  }
}

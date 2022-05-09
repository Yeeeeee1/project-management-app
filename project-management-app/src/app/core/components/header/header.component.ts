import { HostListener, Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isSticky: boolean;

  public auth = ROUTH_PATHS.AUTHORIZATION;

  public login = ROUTH_PATHS.LOGIN;

  public register = ROUTH_PATHS.REGISTRATION;

  public isLogged: boolean = true;

  constructor(private router: Router, public authService:AuthService) {
    this.authService.isLogin$.subscribe((val) => { this.isLogged = val; });
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.isSticky = window.scrollY > 0;
  }

  public openEditProfile(): void {
    this.router.navigate([ROUTH_PATHS.EDIT_PROFILE]);
  }
}

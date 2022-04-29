import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isSticky: boolean;

  constructor(
    private router: Router,
  ) {}

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.isSticky = window.scrollY > 0 ? true : false;
  }

  public openEditProfile(): void {
    this.router.navigate([ROUTH_PATHS.EDIT_PROFILE]);
  }
}

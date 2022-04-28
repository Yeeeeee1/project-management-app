import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isSticky: boolean;

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.isSticky = window.scrollY > 0 ? true : false;
  }
}

import { HostListener, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LANG_CHECKED, LANG_EN, LANG_RU, ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';

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

  public isLanguageChecked: boolean;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    private dialogService: DialogService,
    private translateService: TranslateService
  ) {
    this.authService.isLogin$.subscribe((val) => {
      this.isLogged = val;
    });
    this.isLanguageChecked = JSON.parse(
      localStorage.getItem(LANG_CHECKED) || 'false'
    );
    this.changeLanguage(this.isLanguageChecked);
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.isSticky = window.scrollY > 0;
  }

  public openEditProfile(): void {
    this.router.navigate([ROUTH_PATHS.EDIT_PROFILE]);
  }

  openDialog() {
    this.dialogService.openDialog();
  }

  public onToggle(event: MatSlideToggleChange) {
    const isLangToggled = event.checked;
    localStorage.setItem(LANG_CHECKED, JSON.stringify(isLangToggled));
    this.changeLanguage(isLangToggled);
  }

  private changeLanguage(isLangToggled: boolean) {
    if (isLangToggled) {
      this.translateService.use(LANG_RU);
    } else {
      this.translateService.use(LANG_EN);
    }
  }
}

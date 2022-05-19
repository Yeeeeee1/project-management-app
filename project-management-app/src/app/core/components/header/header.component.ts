import { HostListener, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';
import { TranslateVariablesService } from 'src/app/shared/translate-variables.service';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalComponent } from '../deletion-modal/deletion-modal.component';
import {
  LANG_CHECKED,
  LANG_EN,
  LANG_RU,
  ROUTH_PATHS,
} from '../../../shared/constants/constants';
import { CreateBoardModalComponent } from '../../../main/components/create-board-modal/create-board-modal.component';

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
    public translate:TranslateVariablesService,
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private translateService: TranslateService,

  ) {
    this.authService.isLogin$.subscribe((val) => {
      this.isLogged = val;
    });
    this.isLanguageChecked = JSON.parse(
      localStorage.getItem(LANG_CHECKED) || 'false',
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

  openDeleteModal() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser();
      }
    });
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

  createBoard(): void {
    this.dialog.open(CreateBoardModalComponent);
  }
}

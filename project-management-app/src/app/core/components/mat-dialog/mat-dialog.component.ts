import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpAuthService } from '../../../auth/services/http-auth.service';
import { ROUTH_PATHS } from '../../../shared/constants/constants';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss'],
})
export class MatDialogComponent {
  public userId = '';

  public jwtHelper: JwtHelperService;

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    public location: Location,
    public authService: AuthService,
    public httpAuthService: HttpAuthService,
    private router: Router,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  deleteUser() {
    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('token') as string,
    ).userId;
    this.httpAuthService.deleteUser(this.userId);
    localStorage.clear();
    this.authService.isLogin$.next(false);
    this.closeDialog();
    this.router.navigate([ROUTH_PATHS.WELCOME]);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

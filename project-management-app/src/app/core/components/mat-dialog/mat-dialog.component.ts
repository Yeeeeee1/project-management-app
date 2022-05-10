import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpAuthService } from 'src/app/auth/services/http-auth.service';
import { Router } from '@angular/router';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { MatDialogRef } from '@angular/material/dialog';

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
    private router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  deleteUser() {
    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('token') as string
    ).userId;
    this.httpAuthService
      .deleteUser(this.userId)
      .subscribe((data) => console.log(data));
    localStorage.clear();
    this.authService.isLogin$.next(false);
    this.closeDialog();
    this.router.navigate([ROUTH_PATHS.WELCOME]);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

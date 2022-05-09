/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, of, Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';
import { IUser } from '../models/login.model';
import { AppStateService } from 'src/app/shared/services/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | null;

  private user: IUser | null;

  private tokenSubscription = new Subscription();

  private timeout: number;

  jwtHelper: JwtHelperService;

  public isLogin$ = new BehaviorSubject(!!localStorage.getItem('token'));

  constructor(
    public http: HttpClient,
    private router: Router,
    public appStateService: AppStateService
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  updateToken(token: string) {
    localStorage.setItem('token', token);
    this.authToken = token;
    this.appStateService.userId.next(
      this.jwtHelper.decodeToken(this.authToken).userId
    );
    this.isLogin$.next(true);
    this.expirationCounter();
  }

  expirationCounter() {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(1000 * 60 * 60 * 24))
      .subscribe(() => {
        this.logout();
        this.router.navigate([ROUTH_PATHS.WELCOME]);
      });
  }

  logout() {
    this.tokenSubscription.unsubscribe();
    this.authToken = null;
    this.user = null;
    this.isLogin$.next(false);
    localStorage.clear();
    this.router.navigate([ROUTH_PATHS.WELCOME]);
  }

  tokenCheck() {
    const token = localStorage.getItem('token') as string;
    const dateNow = new Date().getTime();
    const dateToken = this.jwtHelper.decodeToken(token).iat * 1000;
    this.timeout = 1000 * 60 * 60 * 24;
    const expTime = this.timeout - (dateNow - dateToken);
    this.tokenSubscription = of(null)
      .pipe(delay(expTime))
      .subscribe(() => {
        this.logout();
      });
  }
}

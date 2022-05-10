/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, ILogin, IUpdateUser } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  public jwtHelper: JwtHelperService;

  public userId = '';

  constructor(public http: HttpClient, public router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  public handleError<T>(result?: T, operation = 'operation') {
    return (error: any): Observable<T> => of(error.error.message);
  }

  public createUser(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>('signup', user)
      .pipe(catchError(this.handleError<any>('this is a error', '')));
  }

  public login(user: IUser): Observable<ILogin> {
    return this.http
      .post<IUser>('signin', user)
      .pipe(catchError(this.handleError<any>('login', '')));
  }

  public upDateUser(
    user: IUser,
    userId: string | undefined
  ): Observable<IUpdateUser> {
    return this.http.put<IUpdateUser>(`users/${userId}`, user);
  }

  public getUserById(id: string): Observable<IUser> {
    this.userId = this.jwtHelper.decodeToken(id).userId;
    return this.http
      .get<IUser>(`users/${this.userId}`)
      .pipe(catchError(this.handleError<any>('userId', '')));
  }

  public getAllUsers(): Observable<IUpdateUser[]> {
    return this.http.get<IUpdateUser[]>('users');
  }

  public deleteUser(id: string) {
    return this.http
      .delete<IUser>(`users/${id}`)
      .pipe(catchError(this.handleError<any>('deleteUser', '')));
  }
}

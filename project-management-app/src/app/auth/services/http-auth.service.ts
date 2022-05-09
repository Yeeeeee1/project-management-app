/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, catchError, BehaviorSubject } from 'rxjs';
import { IUser, ILogin, IUpdateUser } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  constructor(public http: HttpClient, public router: Router) {}

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
    return this.http.get<IUser>(`${id}`);
  }

  public getAllUsers(): Observable<IUpdateUser[]> {
    return this.http.get<IUpdateUser[]>('users');
  }

  public deleteUser(id: string) {
    return this.http.delete<IUser>(`users/${id}`);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { IUser, ILogin } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  constructor(public http: HttpClient, public router: Router) {}

  public handleError<T>(result?: T, operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public createUser(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>('signup', user)
      .pipe(catchError(this.handleError<any>('createUser', '')));
  }

  public login(user: IUser): Observable<ILogin> {
    return this.http
      .post<IUser>('signin', user)
      .pipe(catchError(this.handleError<any>('login', '')));
  }

  // public upDateUser(user: IUser): Observable<IUser> {
  //   return this.http.put<IUser>(`${user.id}`, user);
  // }

  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${id}`);
  }
}

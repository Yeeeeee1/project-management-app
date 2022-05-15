import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  clickCreateEvent: EventEmitter<any> = new EventEmitter();
  baseUrl: string = 'boards';

  constructor(private http: HttpClient) {}

  handleError<T>(result?: T, operation = 'operation') {
    return (error: any): Observable<T> => of(error.error.message);
  }

  getBoards(): void {
    this.http
      .get(this.baseUrl)
      .pipe(catchError(this.handleError<any>('getBoards', '')))
      .subscribe((data: any) => this.showResults(data));
  }

  createBoard(board: any): any {
    return this.http
      .post(this.baseUrl, board)
      .pipe(catchError(this.handleError<any>('createBoard', '')))
      .subscribe((data: any) => this.getBoards());
  }

  changeName(board: any, id: any): any {
    return this.http
      .put(this.baseUrl + '/' + id, board)
      .pipe(catchError(this.handleError<any>('chnageBoardName', '')))
      .subscribe((data: any) => this.getBoards());
  }

  deleteBoard(id: any): any {
    return this.http
      .delete(this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError<any>('deleteBoard', '')))
      .subscribe((data: any) => this.getBoards());
  }

  showResults(data: any): void {
    this.clickCreateEvent.emit(data);
  }
}

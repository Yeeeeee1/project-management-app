import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {
  catchError, map, Observable, of,
} from 'rxjs';
import { IMainBoardModel } from '../../shared/models/IMainBoardModel';
import { IMainCreateBoardModel } from '../../shared/models/IMainCreateBoardModel';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  clickCreateEvent: EventEmitter<IMainBoardModel[]> = new EventEmitter();

  baseUrl: string = 'boards';

  constructor(private http: HttpClient) {}

  handleError<T>(result?: T, operation = 'operation') {
    return (error: ErrorEvent): Observable<T> => of(error.error.message);
  }

  getBoards() {
    this.http
      .get(this.baseUrl)
      .pipe(catchError(this.handleError<unknown>('getBoards', ''))).pipe(map((response) => (response as IMainBoardModel[])))
      .subscribe((data) => this.showResults(data));
  }

  createBoard(board: IMainCreateBoardModel): void {
    this.http
      .post(this.baseUrl, board)
      .pipe(catchError(this.handleError<unknown>('createBoard', '')))
      .subscribe(() => this.getBoards());
  }

  changeName(board: IMainCreateBoardModel, id: string): void {
    this.http
      .put(`${this.baseUrl}/${id}`, board)
      .pipe(catchError(this.handleError<unknown>('chnageBoardName', '')))
      .subscribe(() => this.getBoards());
  }

  deleteBoard(id: string): void {
    this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<unknown>('deleteBoard', '')))
      .subscribe(() => this.getBoards());
  }

  showResults(data: IMainBoardModel[]): void {
    this.clickCreateEvent.emit(data);
  }

  public getBoardById(id: string) {
    return this.http
      .get(`boards/${id}`)
      .pipe(map((response) => (response as IMainBoardModel)));
  }
}

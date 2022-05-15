import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  clickCreateEvent: EventEmitter<any> = new EventEmitter();
  baseUrl: string = 'boards';
  /* private headers = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMDVjNmExNS1lMmE0LTQ5MTAtOTVlNi01MTM3ZDg1MWIzOWMiLCJsb2dpbiI6InVzZXIwMDFiaGIiLCJpYXQiOjE2NTI1NDk5MDZ9.G71eXFZVdLpjRw6xccnxOJl2BMjDQjodqRYl11z7yq0',
    },
  }; */

  constructor(private http: HttpClient) {}

  getBoards(): void {
    this.http
      .get(this.baseUrl)
      .subscribe((data: any) => this.showResults(data));
  }

  createBoard(board: any): any {
    return this.http
      .post(this.baseUrl, board)
      .subscribe((data: any) => this.getBoards());
  }

  changeName(board: any, id: any): any {
    return this.http
      .put(this.baseUrl + '/' + id, board)
      .subscribe((data: any) => this.getBoards());
  }

  deleteBoard(id: any): any {
    return this.http
      .delete(this.baseUrl + '/' + id)
      .subscribe((data: any) => this.getBoards());
  }

  showResults(data: any): void {
    this.clickCreateEvent.emit(data);
  }
}

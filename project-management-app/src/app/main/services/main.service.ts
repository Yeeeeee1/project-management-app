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
  private headers = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMDVjNmExNS1lMmE0LTQ5MTAtOTVlNi01MTM3ZDg1MWIzOWMiLCJsb2dpbiI6InVzZXIwMDFiaGIiLCJpYXQiOjE2NTI1NDk5MDZ9.G71eXFZVdLpjRw6xccnxOJl2BMjDQjodqRYl11z7yq0',
    },
  };

  constructor(private http: HttpClient) {}

  getBoards(): Observable<any> {
    return this.http.get(this.baseUrl, this.headers);
  }

  createBoard(board: any): any {
    return this.http.post(this.baseUrl, board, this.headers);
  }

  changeName(board: any, id: any): any {
    return this.http.put(this.baseUrl + '/' + id, board, this.headers);
  }

  deleteBoard(id: any): any {
    return this.http.delete(this.baseUrl + '/' + id, this.headers);
  }

  showResults(data: any): void {
    this.clickCreateEvent.emit(data);
  }
}

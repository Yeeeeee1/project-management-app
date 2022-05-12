import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  clickCreateEvent: EventEmitter<any> = new EventEmitter();
  baseUrl: string = 'http://localhost:4200/api/boards';
  private headers = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTJlYWQ1ZS01NTNjLTQ5ZGQtOWEyNy1lZWMxODljZWY2Y2EiLCJsb2dpbiI6InVzZXIwMDFhYWFhIiwiaWF0IjoxNjUyMjkxMzM3fQ.1kXRTbpGBiTTCtF7Lq42NsLQKn5eTdigQS7JNoE2jP4',
    },
  };

  constructor(private http: HttpClient) {}

  getBoards(): Observable<any> {
    return this.http.get(this.baseUrl, this.headers);
  }

  createBoard(board: any): any {
    return this.http.post(this.baseUrl, board, this.headers);
  }

  changeName(board: IMainBoardModel): void {
    this.http.put(this.baseUrl, board, this.headers);
  }

  deleteBoard(id: any): any {
    return this.http.delete(this.baseUrl + '/' + id, this.headers);
  }

  showResults(data: any): void {
    this.clickCreateEvent.emit(data);
  }
}

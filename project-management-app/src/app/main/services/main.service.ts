import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl: string = 'http://localhost:4200/api/boards';
  private headers = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTBlMDcwNS1hMzE3LTQyNTUtYmU3MS1jMGRkMzAwYTY2YzYiLCJsb2dpbiI6InV1c2VyMDAxIiwiaWF0IjoxNjUyMTA4ODU5fQ.MswDHxn4IXTtCwpSJoTK7PBgP33HNOJmNgmdoRUy95g',
    },
  };

  constructor(private http: HttpClient) {}

  getBoards(): Observable<any> {
    return this.http.get(this.baseUrl, this.headers);
  }

  createBoard(board: IMainBoardModel): void {
    this.http.post(this.baseUrl, board, this.headers).subscribe(() => {
      this.getBoards().subscribe((data: IMainBoardModel[]) => {
        console.log(data);
      });
    });
  }

  changeName(board: IMainBoardModel): void {
    this.http.put(this.baseUrl, board, this.headers);
  }

  deleteBoard(id: string): void {
    this.http.delete(this.baseUrl + '/' + id, this.headers);
  }
}

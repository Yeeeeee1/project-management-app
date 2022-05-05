import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { BASE_API } from "src/app/shared/constants/constants";
import { Column } from "../models/column";

@Injectable({
    providedIn: 'root',
  })
  export class BoardsService {
    private headers = {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNWNkNjM0ZC0wODFhLTRlNzQtYTM2OC02NDhiNDgxMmRiNTIiLCJsb2dpbiI6InZpdmEiLCJpYXQiOjE2NTE3NzI0MTF9.JTopK8yVRTMImStdu-wc_AXtVZyr34qZ8xQWO0WxwpQ'}}
    private boardId = 'eac0f3c3-8370-4657-b2f7-a34d65559303';

    constructor(private router: Router, private http: HttpClient) {}

    public getColumns(
        onSuccessFunction: (columns: Column[]) => void
      ): void {
        this.http
          .get(`${BASE_API}/boards/${this.boardId}/columns`, this.headers)
          .pipe(map((response) => (response as Column[])))
          .subscribe({
            next: (value) => onSuccessFunction(value),
            error: (error) => this.router.navigate(['/error']),
          });
      }

      public deleteColumn(columnId: string, onSuccessFunction: () => void): void {
        this.http.delete(`${BASE_API}/boards/${this.boardId}/columns/${columnId}`, this.headers).subscribe({
          next: (value) => onSuccessFunction(),
          error: (error) => this.router.navigate(['/error']),
        })
      }

  }

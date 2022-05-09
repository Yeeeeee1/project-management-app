import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Subject } from "rxjs";
import { BASE_API } from "src/app/shared/constants/constants";
import { Column } from "../models/column";

@Injectable({
    providedIn: 'root',
  })
  export class ColumnsService {
    public columns$ = new Subject<Column[]>();
    private lastOrderNumber:number;
    private headers = {headers: {'Authorization': 'Bearer '}}
    private idBoard: string;

    constructor(private router: Router, private http: HttpClient) {}

    public getColumns(
      ): void {
        this.http
          .get(`${BASE_API}/boards/${this.idBoard}/columns`, this.headers)
          .pipe(map((response) => (response as Column[])))
          .subscribe({
            next: (columns) => {
              this.columns$.next(columns);
              this.lastOrderNumber = columns.slice(-1)[0].order;
            },
            error: () => this.router.navigate(['/error']),
          });
      }

    public deleteColumn(columnId: string): void {
      this.http.delete(`${BASE_API}/boards/${this.idBoard}/columns/${columnId}`, this.headers).subscribe({
        next: () => this.getColumns(),
        error: () => this.router.navigate(['/error']),
      })
    }

    public createColumn(title: string): void {
      const column = { title: title, order: 1 + this.lastOrderNumber}
      this.http.post(`${BASE_API}/boards/${this.idBoard}/columns`, column, this.headers).subscribe({
        next: () => this.getColumns(),
        error: () => this.router.navigate(['/error']),
    })
  }

  public setIdBoard(id: string) {
    this.idBoard = id;
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Subject } from "rxjs";
import { Column } from "../models/column";

@Injectable({
    providedIn: 'root',
  })
  export class ColumnsService {
    public columns$ = new Subject<Column[]>();
    private lastOrderNumber:number;
    private idBoard: string;

    constructor(private router: Router, private http: HttpClient) {}

    public getColumns(
      ): void {
        this.http
          .get(`boards/${this.idBoard}/columns`)
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
      this.http.delete(`boards/${this.idBoard}/columns/${columnId}`).subscribe({
        next: () => this.getColumns(),
        error: () => this.router.navigate(['/error']),
      })
    }

    public createColumn(title: string): void {
      const column = { title: title, order: 1 + (this.lastOrderNumber ?? 0)}
      this.http.post(`boards/${this.idBoard}/columns`, column).subscribe({
        next: () => this.getColumns(),
        error: () => this.router.navigate(['/error']),
    })
  }

  public setIdBoard(id: string) {
    this.idBoard = id;
  }
}

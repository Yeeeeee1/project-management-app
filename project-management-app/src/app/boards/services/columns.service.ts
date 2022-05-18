import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { MainService } from 'src/app/main/services/main.service';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  public columns$ = new Subject<Column[]>();

  public firstColumn: string;

  private lastOrderNumber:number;

  private idBoard: string;

  constructor(private router: Router, private http: HttpClient) {}

  public getColumns(): void {
    this.http
      .get(`boards/${this.idBoard}/columns`)
      .pipe(map((response) => (response as Column[])))
      .subscribe({
        next: (columns) => {
          this.columns$.next(columns);
          this.lastOrderNumber = columns.slice(-1)[0].order;
          this.firstColumn = columns[0].title;
        },
        error: () => this.router.navigate(['/error']),
      });
  }

  public deleteColumn(columnId: string): void {
    this.http.delete(`boards/${this.idBoard}/columns/${columnId}`).subscribe({
      next: () => this.getColumns(),
      error: () => this.router.navigate(['/error']),
    });
  }

  public createColumn(title: string): void {
    const column = { title, order: 1 + (this.lastOrderNumber ?? 0) };
    this.http.post(`boards/${this.idBoard}/columns`, column).subscribe({
      next: () => this.getColumns(),
      error: () => this.router.navigate(['/error']),
    });
  }

  updateColumn(column: Column): void {
    this.http.put(`boards/${this.idBoard}/columns/${column.id}`, { title: column.title, order: column.order }).subscribe({
      next: () => this.getColumns(),
      error: () => this.router.navigate(['/error']),
    });
  }

  public getColumn(id: string):Observable<Column> {
    return this.http
      .get(`boards/${this.idBoard}/columns/${id}`)
      .pipe(map((response) => (response as Column)));
  }

  public setIdBoard(id: string) {
    this.idBoard = id;
  }

  public getIdBoard(): string {
    return this.idBoard;
  }
}

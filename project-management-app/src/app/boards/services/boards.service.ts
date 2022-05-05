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
    private headers = {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNWNkNjM0ZC0wODFhLTRlNzQtYTM2OC02NDhiNDgxMmRiNTIiLCJsb2dpbiI6InZpdmEiLCJpYXQiOjE2NTE3MDUyNjN9.-mroM1GbtB1OIEMwU9yZqfqB-PtNA8aHbg4ql3uBaI0'}}

    constructor(private router: Router, private http: HttpClient) {}

    public getColumns(
        boardId: string,
        onSuccessFunction: (columns: Column[]) => void
      ): void {
        this.http
          .get(`${BASE_API}/boards/${boardId}/columns`, this.headers)
          .pipe(map((response) => (response as Column[])))
          .subscribe({
            next: (value) => onSuccessFunction(value),
            error: (error) => this.router.navigate(['/error']),
          });
      }

  }

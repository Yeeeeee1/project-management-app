import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnsService } from './columns.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private columnsService: ColumnsService,
  ) {}

  public deleteTask(columnId: string, taskId: string): void {
    const boardId = this.columnsService.getIdBoard();
    this.http.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`).subscribe({
    //   next: () => this.getColumns(),
      error: () => this.router.navigate(['/error']),
    });
  }

  public deleteTasksByColumnId(columnId: string): void {
    //get array of tasks
    //for each by each task and delete by id
  }
}

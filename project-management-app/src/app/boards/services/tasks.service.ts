import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Subject } from 'rxjs';
import { AppStateService } from 'src/app/shared/services/app-state.service';
import { ITask, ITaskForm } from '../models/task';
import { ColumnsService } from './columns.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks$ = new Subject<ITask[]>();

  private lastOrderNumber: number = 0;

  public taskId$ = new Subject<string>();

  public columnId$ = new Subject<string | undefined>();

  jwtHelper: JwtHelperService;

  private userId: string;

  public taskId: string | undefined;

  public columnId: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    public columnsService: ColumnsService,
    private appStateService:AppStateService,
  ) {
    this.jwtHelper = new JwtHelperService();

    this.appStateService.userId.subscribe((id) => { this.userId = id; });
    this.taskId$.subscribe((id) => { this.taskId = id; });
    this.columnId$.subscribe((id) => { this.columnId = id as string; });
  }

  public createTask(form: ITaskForm): void {
    const task = {
      title: form.title,
      done: false,
      order: 1 + (this.lastOrderNumber ?? 0),
      description: form.description,
      userId: this.jwtHelper.decodeToken(localStorage.getItem('token') as string).userId,
    };

    this.http.post(`boards/${this.columnsService.getIdBoard()}/columns/${form.columnId}/tasks`, task).subscribe({
      next: () => this.columnsService.getColumns(),
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  public getTasks(id:string): void {
    this.http
      .get(`boards/${this.columnsService.getIdBoard()}/columns/${id}/tasks`)
      .pipe(map((response) => (response as ITask[])))
      .subscribe({
        next: (tasks) => {
          this.tasks$.next(tasks);
          this.lastOrderNumber = tasks[tasks.length - 1].order;
        },
        error: () => this.router.navigate(['/error']),
      });
  }

  updateTask(form: ITaskForm): void {
    this.taskId$.subscribe((id) => { this.taskId = id; });
    const boardId = this.columnsService.getIdBoard();
    const task = {
      title: form.title,
      done: form.done,
      order: form.order as number,
      description: form.description,
      userId: this.jwtHelper.decodeToken(localStorage.getItem('token') as string).userId,
      boardId,
      columnId: form.columnId,
    };

    this.http.put(`boards/${boardId}/columns/${form.columnId}/tasks/${this.taskId as string}`, task).subscribe({
      next: () => this.columnsService.getColumns(),
      error: (err) => {
        console.error(err);
        this.router.navigate(['/error']);
      },
    });
  }

  public deleteTask(): void {
    this.http.delete(`boards/${this.columnsService.getIdBoard()}/columns/${this.columnId}/tasks/${this.taskId}`).subscribe({
      next: () => this.columnsService.getColumns(),
      error: () => this.router.navigate(['/error']),
    });
  }

  dropTask(event: CdkDragDrop<ITask[]>, tasks:ITask[] | undefined) {
    console.log(event, 'column');
    if (event.previousContainer === event.container) {
      console.log(event);
      moveItemInArray(tasks as ITask[], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        tasks as ITask[],
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

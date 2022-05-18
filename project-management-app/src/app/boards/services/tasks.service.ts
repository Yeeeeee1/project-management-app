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

  private lastOrderNumber:number = 0;

  jwtHelper: JwtHelperService;

  private userId :string;

  constructor(
    private router: Router,
    private http: HttpClient,
    public columnsService: ColumnsService,
    private appStateService:AppStateService,
  ) {
    this.jwtHelper = new JwtHelperService();

    this.appStateService.userId.subscribe((id) => { this.userId = id; });
  }

  public createTask(form: ITaskForm): void {
    const task = {
      title: form.title,
      done: false,
      order: 1 + (this.lastOrderNumber ?? 0),
      description: form.description,
      userId: this.jwtHelper.decodeToken(localStorage.getItem('token') as string).userId,
    };
    console.log(task.order, this.lastOrderNumber, task.userId, form.description);
    this.http.post(`boards/${this.columnsService.idBoard}/columns/${form.column}/tasks`, task).subscribe({
      next: () => this.getTasks(form.column),
      error: () => this.router.navigate(['/error']),
    });
  }

  public getTasks(id:string): void {
    this.http
      .get(`boards/${this.columnsService.idBoard}/columns/${id}/tasks`)
      .pipe(map((response) => (response as ITask[])))
      .subscribe({
        next: (tasks) => {
          this.tasks$.next(tasks);
          console.log(tasks);
          this.lastOrderNumber = tasks[tasks.length - 1].order;
        },
        error: () => this.router.navigate(['/error']),
      });
  }
}

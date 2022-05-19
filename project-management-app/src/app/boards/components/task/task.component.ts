import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/core/components/deletion-modal/deletion-modal.component';
import { ITask } from '../../models/task';
import { ColumnsService } from '../../services/columns.service';
import { TaskService } from '../../services/tasks.service';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: ITask;

  @Input() columnId: string | undefined;

  constructor(

public dialog: MatDialog,
private columnsService: ColumnsService,
private tasksService:TaskService,
  ) { }

  editTask(task:ITask, columnId: string | undefined) {
    this.dialog.open(
      TaskEditComponent,
      {
        data: {
          title: task.title,
          description: task.description,
          done: task.done,
          columnId,
          order: task.order,
        },
      },
    );
    this.tasksService.taskId$.next(task.id);
    this.tasksService.columnId$.next(columnId);
  }

  openDeleteModal(event:Event, task:ITask, columnId: string | undefined) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(
      ModalComponent,
      {
        data: {
          title: task.title,
          description: task.description,
          done: task.done,
          columnId,
          order: task.order,
        },
      },
    );
    this.tasksService.columnId$.next(columnId);
    this.tasksService.taskId$.next(task.id);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.deleteTask();
      }
    });
  }
}

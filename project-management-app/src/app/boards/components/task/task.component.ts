import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
public dialog: MatDialog,
private columnsService: ColumnsService,
tasksService:TaskService,
  ) { }

  editTask() {
    this.dialog.open(TaskEditComponent);
  }
}

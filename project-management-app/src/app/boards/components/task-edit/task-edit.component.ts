import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/core/components/deletion-modal/deletion-modal.component';
import { MainService } from 'src/app/main/services/main.service';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { TaskService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  title = '';

  description = '';

  selected: string = this.columnsService.firstColumn;

  columns$ = new Subject<Column[]>();

  columns: Column[];

  constructor(
private fb: FormBuilder,
    public dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) public data:
      { title: string, description: string, done: boolean, columnId: string, order:number},
    private mainService: MainService,
    public columnsService: ColumnsService,
    private tasksService:TaskService,
    public dialog: MatDialog,
  ) {
    this.columnsService.getColumns();
    this.columnsService.columns$.subscribe((val) => {
      this.columns = val;
    });
  }

  public taskEdit = this.fb.group({
    title: [this.data.title,
      [Validators.required]],
    description: [this.data.description,
      [Validators.required]],

    checkbox: [this.data.done],

  });

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    const dialogRef = this.dialog.open(
      ModalComponent,
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.deleteTask();
      }
    });

    this.onCancel();
  }

  upDateTask() {
    const form = {
      title: this.taskEdit.value.title,
      done: this.taskEdit.value.checkbox,
      order: this.data.order as number,
      description: this.taskEdit.value.description,
      columnId: this.data.columnId,

    };

    this.tasksService.updateTask(form);
    this.onCancel();
  }
}

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

  public taskEdit = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    column: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });

  constructor(
private fb: FormBuilder,
    public dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
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

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    this.tasksService.deleteTask();
    console.log('del');
    this.onCancel();
  }
}

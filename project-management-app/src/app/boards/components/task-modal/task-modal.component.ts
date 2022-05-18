import { Component, Inject } from '@angular/core';
import {
  FormBuilder, Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MainService } from 'src/app/main/services/main.service';
import { Column } from '../../models/column';
import { ColumnsService } from '../../services/columns.service';
import { TaskService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  title = '';

  description = '';

  selected: string = this.columnsService.firstColumn;

  columns$ = new Subject<Column[]>();

  columns: Column[];

  public columnsSelect = this.fb.group({
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
  ) {
    this.columnsService.getColumns();
    this.columnsService.columns$.subscribe((val) => {
      this.columns = val;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  createBoard(): void {
    this.tasksService.createTask(this.columnsSelect.value);
    this.onCancel();
  }

  selectColumn(event:Event) {
    this.selected = (event.target as HTMLSelectElement).value;
  }
}

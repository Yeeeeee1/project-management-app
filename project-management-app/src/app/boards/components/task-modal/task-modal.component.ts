import { Component, Inject } from '@angular/core';
import {
  FormBuilder, Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
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

  selected = new BehaviorSubject<string>(this.columnsService.firstColumn);

  columns$ = new Subject<Column[]>();

  columns: Column[];

  public defaultColumn:string = '';

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
      this.defaultColumn = val[0].id;
    });
  }

  public columnsSelect = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    columnId:
      [this.defaultColumn, [Validators.required]],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  createBoard(): void {
    this.tasksService.createTask(this.columnsSelect.value);
    console.log(this.columnsSelect.value);
    this.onCancel();
  }

  selectColumn(event:Event) {
    this.selected.next((event.target as HTMLSelectElement).value);
  }
}

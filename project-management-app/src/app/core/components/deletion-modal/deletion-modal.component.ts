import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/boards/models/task';

@Component({
  selector: 'app-modal-deletion',
  templateUrl: './deletion-modal.component.html',
  styleUrls: ['./deletion-modal.component.scss'],
})
export class ModalComponent {
  @Input() task: ITask;

  constructor(@Inject(MAT_DIALOG_DATA) public data:
      { title: string, description: string, done: boolean, columnId: string, order:number}) {}
}

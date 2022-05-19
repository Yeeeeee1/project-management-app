import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from './boards/models/task';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(tasks: ITask[]): ITask[] | null {
    console.log(tasks);
    if (tasks) {
      const taskList = tasks.slice()
        .sort((taskPrev: ITask, taskNext: ITask) => taskPrev.order - taskNext.order);
      return taskList;
    } return null;
  }
}

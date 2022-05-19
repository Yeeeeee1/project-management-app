import { Pipe, PipeTransform } from '@angular/core';
import { IMainBoardModel } from '../models/IMainBoardModel';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(args: string, value: IMainBoardModel[]): IMainBoardModel[] {

    args = args.toLowerCase();

    return value.filter(function (item: IMainBoardModel) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}

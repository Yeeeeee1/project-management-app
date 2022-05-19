import { Pipe, PipeTransform } from '@angular/core';
import { IMainBoardModel } from '../models/IMainBoardModel';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(args: any, value: any): any[] {

    args = args.toLowerCase();

    return value.filter(function (item: IMainBoardModel) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}

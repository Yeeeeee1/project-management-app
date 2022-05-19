import { Column } from './models/column';

export function sortByOrderNumber(columns: Column[]): void {
  columns.sort((column1, column2) => column1.order - column2.order);
}

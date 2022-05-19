export interface ITaskForm {
  title: string;
  description: string;
  columnId: string;
  done?: boolean;
  order?:number
}
export interface ITask
{
  id: string;
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

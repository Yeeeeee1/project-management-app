export interface ITaskForm {
  title: string;
  description: string;
  column:string
}
export interface ITask
{
  id: string;
  title: string;
  done: true;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

}

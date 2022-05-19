import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/boards/models/column';
import { ITask } from 'src/app/boards/models/task';
import { ColumnsService } from 'src/app/boards/services/columns.service';
import { TaskService } from 'src/app/boards/services/tasks.service';
import { MainService } from 'src/app/main/services/main.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  tasks:any = [];
  ids: any = [];

  constructor(private columnService: ColumnsService, private mainService: MainService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.mainService.getBoards();
    this.mainService.clickCreateEvent.subscribe((data) => data.map((value: any) => { 
      this.columnService.setIdBoard(value.id);
      this.columnService.getColumns();
    }));this.columnService.columns$.subscribe((columns: Column[]) => {
      columns.map((value) => {
        this.taskService.getTasks(value.id);
        
      });});

         this.taskService.tasks$.subscribe((data: any) => {data[0] ? this.tasks.push(...data, ...this.tasks) : null;});
    
    
  }

}

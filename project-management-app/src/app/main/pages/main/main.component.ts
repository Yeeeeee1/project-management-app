import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:4200/api/boards', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMWU0ZTNmYi1kZjg5LTQ5YTgtOWY2MS03MjFmNmFkNjhlYjgiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE3NzE5MzJ9.rwvQjDxX3xGh44glcfrenzXTJRLOLWnBUsZpua-uCy0',
        },
      })
      .subscribe((data) => console.log(data));
  }
}

import { Component, OnInit } from '@angular/core';
import { ROUTH_PATHS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss'],
})
export class PageErrorComponent implements OnInit {
  constructor() {}

  public boards = './../boards';

  ngOnInit(): void {}
}

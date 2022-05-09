import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';
import { MainService } from '../../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardModalComponent } from '../../components/create-board-modal/create-board-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  data: IMainBoardModel[] = [];
  getBoardsSub: Subscription | null = new Subscription();
  title = 'aa';
  id = '5';

  constructor(private mainService: MainService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBoardsSub = this.mainService
      .getBoards()
      .subscribe((data: IMainBoardModel[]) => {
        this.data = data;
        console.log(1);
      });
  }

  createBoard() {
    this.dialog.open(CreateBoardModalComponent);

    this.mainService.createBoard({ title: this.title, id: this.id });
  }

  ngOnDestroy(): void {
    this.getBoardsSub?.unsubscribe();
    this.getBoardsSub = null;
  }
}

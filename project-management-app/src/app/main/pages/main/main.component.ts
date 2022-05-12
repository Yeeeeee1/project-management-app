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

  constructor(private mainService: MainService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBoardsSub = this.mainService.clickCreateEvent.subscribe(
      (data: IMainBoardModel[]) => {
        this.data = data;
      }
    );
  }

  createBoard(): void {
    this.dialog.open(CreateBoardModalComponent);
  }

  deleteBoard(id: any): void {
    this.mainService.deleteBoard(id).subscribe((data: any) => {});
    this.mainService.getBoards().subscribe((data: any) => {
      this.mainService.showResults(data);
    });
  }

  changeName(): void {
    this.dialog.open(CreateBoardModalComponent);
  }

  ngOnDestroy(): void {
    this.getBoardsSub?.unsubscribe();
    this.getBoardsSub = null;
  }
}

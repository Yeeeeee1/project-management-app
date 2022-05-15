import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IMainBoardModel } from '../../../shared/models/IMainBoardModel';
import { ModalComponent } from '../../../core/components/deletion-modal/deletion-modal.component';
import { MainService } from '../../services/main.service';
import { ChangeBoardModalComponent } from '../../components/change-board-modal/change-board-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  data: IMainBoardModel[] = [];

  subscriptions: Subscription | null = new Subscription();

  isNoBoards = false;

  constructor(private mainService: MainService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const getBoardsSub = this.mainService.getBoards();
    const createEventSub = this.mainService.clickCreateEvent.subscribe(
      (data: IMainBoardModel[]) => {
        this.data = data;

        if (!data[0]) {
          this.isNoBoards = true;
        } else {
          this.isNoBoards = false;
        }
      },
    );

    this.subscriptions?.add(getBoardsSub);
    this.subscriptions?.add(createEventSub);
  }

  deleteBoard(id: string): void {
    const dialogRef = this.dialog.open(ModalComponent);

    const dialogAfterClosedSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mainService.deleteBoard(id);
      }
    });

    this.subscriptions?.add(dialogAfterClosedSub);
  }

  changeName(id: string): void {
    const dialogRef = this.dialog.open(ChangeBoardModalComponent);
    dialogRef.componentInstance.id = id;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
    this.subscriptions = null;
  }
}

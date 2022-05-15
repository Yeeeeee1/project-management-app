import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMainBoardModel } from 'src/app/shared/models/IMainBoardModel';
import { MainService } from '../../services/main.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateBoardModalComponent } from '../../components/create-board-modal/create-board-modal.component';
import { ChangeBoardModalComponent } from '../../components/change-board-modal/change-board-modal.component';
import { ModalComponent } from 'src/app/core/components/deletion-modal/deletion-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  data: IMainBoardModel[] = [];
  getBoardsSub: Subscription | null = new Subscription();

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.mainService.getBoards().subscribe((data: any) => {
      this.data = data;
    });
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
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mainService.deleteBoard(id).subscribe(() => {
          this.mainService.getBoards().subscribe((data: any) => {
            this.mainService.showResults(data);
          });
        });
      }
    });
  }

  changeName(id: any): void {
    let dialogRef = this.dialog.open(ChangeBoardModalComponent);
    dialogRef.componentInstance.id = id;
  }

  ngOnDestroy(): void {
    this.getBoardsSub?.unsubscribe();
    this.getBoardsSub = null;
  }
}

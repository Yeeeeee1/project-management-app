import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BoardsRoutingModule } from "./boards-routing.module";
import { ColumnComponent } from "./components/column/column.component";
import { BoardComponent } from "./pages/board/board.component";

@NgModule({
    declarations: [BoardComponent, ColumnComponent],
    imports: [
      CommonModule,
      RouterModule,
      BoardsRoutingModule,
    ],
    exports: [],
  })
  export class BoardsModule {}
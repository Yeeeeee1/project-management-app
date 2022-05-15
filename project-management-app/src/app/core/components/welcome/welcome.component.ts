import { Component, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion/expansion-panel';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @ViewChild('panel') panel: MatExpansionPanel;

  public up: boolean = false;

  constructor() {}

  public panelVisibleHandler() {
    this.panel.toggle();
    this.up = !this.up;
  }
}

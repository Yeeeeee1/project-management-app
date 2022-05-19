import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBoardModalComponent } from './change-board-modal.component';

describe('ChangeBoardModalComponent', () => {
  let component: ChangeBoardModalComponent;
  let fixture: ComponentFixture<ChangeBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeBoardModalComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

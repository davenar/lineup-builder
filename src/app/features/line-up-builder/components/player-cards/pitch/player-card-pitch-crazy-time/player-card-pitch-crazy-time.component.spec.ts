import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardPitchCrazyTimeComponent } from './player-card-pitch-crazy-time.component';

describe('PlayerCardPitchCrazyTimeComponent', () => {
  let component: PlayerCardPitchCrazyTimeComponent;
  let fixture: ComponentFixture<PlayerCardPitchCrazyTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardPitchCrazyTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardPitchCrazyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardPitchComponent } from './player-card-pitch.component';

describe('PlayerCardPitchComponent', () => {
  let component: PlayerCardPitchComponent;
  let fixture: ComponentFixture<PlayerCardPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardPitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardPitchStickerComponent } from './player-card-pitch-sticker.component';

describe('PlayerCardPitchStickerComponent', () => {
  let component: PlayerCardPitchStickerComponent;
  let fixture: ComponentFixture<PlayerCardPitchStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardPitchStickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardPitchStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

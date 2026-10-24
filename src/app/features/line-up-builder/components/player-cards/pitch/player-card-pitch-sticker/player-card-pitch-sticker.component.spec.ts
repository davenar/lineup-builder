import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../../../../../testing/transloco-testing';

import { PlayerCardPitchStickerComponent } from './player-card-pitch-sticker.component';

describe('PlayerCardPitchStickerComponent', () => {
  let component: PlayerCardPitchStickerComponent;
  let fixture: ComponentFixture<PlayerCardPitchStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardPitchStickerComponent, getTranslocoTestingModule()]
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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardBenchStickerComponent } from './player-card-bench-sticker.component';

describe('PlayerCardBenchStickerComponent', () => {
  let component: PlayerCardBenchStickerComponent;
  let fixture: ComponentFixture<PlayerCardBenchStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardBenchStickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardBenchStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

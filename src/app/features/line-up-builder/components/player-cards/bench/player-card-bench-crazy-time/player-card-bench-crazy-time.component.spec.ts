import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardBenchCrazyTimeComponent } from './player-card-bench-crazy-time.component';

describe('PlayerCardBenchCrazyTimeComponent', () => {
  let component: PlayerCardBenchCrazyTimeComponent;
  let fixture: ComponentFixture<PlayerCardBenchCrazyTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardBenchCrazyTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardBenchCrazyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

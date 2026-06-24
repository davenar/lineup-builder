import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardBenchDefaultComponent } from './player-card-bench-default.component';

describe('PlayerCardBenchDefaultComponent', () => {
  let component: PlayerCardBenchDefaultComponent;
  let fixture: ComponentFixture<PlayerCardBenchDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardBenchDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardBenchDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardBenchComponent } from './player-card-bench.component';

describe('PlayerCardBenchComponent', () => {
  let component: PlayerCardBenchComponent;
  let fixture: ComponentFixture<PlayerCardBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardBenchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCardBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../../../../../testing/transloco-testing';

import { PlayerCardBenchComponent } from './player-card-bench.component';

describe('PlayerCardBenchComponent', () => {
  let component: PlayerCardBenchComponent;
  let fixture: ComponentFixture<PlayerCardBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardBenchComponent, getTranslocoTestingModule()]
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

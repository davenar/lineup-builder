import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../../../testing/transloco-testing';

import { PlayerSearchPanelContentComponent } from './player-search-panel-content.component';

describe('PlayerSearchPanelContentComponent', () => {
  let component: PlayerSearchPanelContentComponent;
  let fixture: ComponentFixture<PlayerSearchPanelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSearchPanelContentComponent, getTranslocoTestingModule()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSearchPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

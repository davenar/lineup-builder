import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPanelContentComponent } from './settings-panel-content.component';

describe('SettingsPanelContentComponent', () => {
  let component: SettingsPanelContentComponent;
  let fixture: ComponentFixture<SettingsPanelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPanelContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

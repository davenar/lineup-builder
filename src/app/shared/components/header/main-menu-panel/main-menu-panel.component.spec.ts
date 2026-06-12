import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuPanelComponent } from './main-menu-panel.component';

describe('MainMenuPanelComponent', () => {
  let component: MainMenuPanelComponent;
  let fixture: ComponentFixture<MainMenuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHostComponent } from './panel-host.component';

describe('PanelHostComponent', () => {
  let component: PanelHostComponent;
  let fixture: ComponentFixture<PanelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

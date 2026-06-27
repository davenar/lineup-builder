import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineUpBuilderComponent } from './line-up-builder.component';

describe('LineUpBuilderComponent', () => {
  let component: LineUpBuilderComponent;
  let fixture: ComponentFixture<LineUpBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineUpBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineUpBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LineupStateService } from './lineup-state.service';

describe('LineupStateService', () => {
  let service: LineupStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineupStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FullscreenLoaderService } from './fullscreen-loader.service';

describe('FullscreenLoaderService', () => {
  let service: FullscreenLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

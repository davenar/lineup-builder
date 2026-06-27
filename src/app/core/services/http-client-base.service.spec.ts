import { TestBed } from '@angular/core/testing';

import { HttpClientBaseService } from './http-client-base.service';

describe('HttpClientBaseService', () => {
  let service: HttpClientBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

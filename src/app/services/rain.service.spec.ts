import { TestBed } from '@angular/core/testing';

import { RainService } from './rain.service';

describe('RainService', () => {
  let service: RainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

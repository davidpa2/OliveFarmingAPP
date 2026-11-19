import { TestBed } from '@angular/core/testing';

import { CueService } from './cue.service';

describe('CueService', () => {
  let service: CueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChronologyService } from './chronology.service';

describe('ChronologyService', () => {
  let service: ChronologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

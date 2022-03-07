import { TestBed } from '@angular/core/testing';

import { BrewTodayService } from './brew-today.service';

describe('BrewTodayService', () => {
  let service: BrewTodayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrewTodayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

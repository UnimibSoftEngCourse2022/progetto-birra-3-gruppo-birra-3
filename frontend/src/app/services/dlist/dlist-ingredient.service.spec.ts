import { TestBed } from '@angular/core/testing';

import { DlistIngredientService } from './dlist-ingredient.service';

describe('DlistIngredientService', () => {
  let service: DlistIngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DlistIngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

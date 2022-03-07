import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownIngredientComponent } from './drop-down-ingredient.component';

describe('DropDownIngredientComponent', () => {
  let component: DropDownIngredientComponent;
  let fixture: ComponentFixture<DropDownIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

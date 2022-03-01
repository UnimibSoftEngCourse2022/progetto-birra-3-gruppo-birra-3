import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecipeComponent } from './form-recipe.component';

describe('FormRecipeComponent', () => {
  let component: FormRecipeComponent;
  let fixture: ComponentFixture<FormRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRecipeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

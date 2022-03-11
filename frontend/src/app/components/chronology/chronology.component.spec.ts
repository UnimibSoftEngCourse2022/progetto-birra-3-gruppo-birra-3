import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologyComponent } from './chronology.component';

describe('ChronologyComponent', () => {
  let component: ChronologyComponent;
  let fixture: ComponentFixture<ChronologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

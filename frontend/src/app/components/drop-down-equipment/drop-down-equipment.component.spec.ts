import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownEquipmentComponent } from './drop-down-equipment.component';

describe('DropDownEquipmentComponent', () => {
  let component: DropDownEquipmentComponent;
  let fixture: ComponentFixture<DropDownEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Equipment } from 'src/app/models/equipment/equipment.model';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-drop-down-equipment',
  templateUrl: './drop-down-equipment.component.html',
  styleUrls: ['./drop-down-equipment.component.css']
})
export class DropDownEquipmentComponent implements OnInit {
  public data: Equipment[] = [];
  public selected: Equipment;

  @Output() selectedEquipment = new EventEmitter<Equipment>();

  constructor(private equipmentService: EquipmentService) {
    this.selected = new Equipment();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
      this.equipmentService.getAllEquipments().subscribe((data: Equipment[]) => {
        this.data = data;
      });
  }

  public emitData() {
    this.selectedEquipment.emit(this.selected);
  }
}

import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Equipment} from 'src/app/models/equipment/equipment.model';
import {EquipmentService} from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-drop-down-equipment',
  templateUrl: './drop-down-equipment.component.html',
  styleUrls: ['./drop-down-equipment.component.css']
})
export class DropDownEquipmentComponent implements OnInit {
  @Input() excludeData: Equipment[] = [];
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
      if (this.excludeData && this.excludeData.length > 0) {
        this.data = data.filter((x: any) => {
          if (this.excludeData.findIndex(f => f.name === x.name) === -1) {
            return x;
          }
        })
      } else {
        this.data = data;
      }
    });
  }

  public emitData() {
    this.selectedEquipment.emit(this.selected);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {EquipmentProfile} from 'src/app/models/equipment/equipment.model';
import {EquipmentService} from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css'],
})
export class EquipmentCardComponent implements OnInit {
  @Input() equipment?: EquipmentProfile;

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
  }

  deleteEquipment(id: string): void {
    this.equipmentService.delete(id).subscribe({
      next: (res) => {
      },
      error: (e) => console.error(e),
    });
  }

  getNameEquipments() {
    return this.equipment?.equipments?.map(x => {
      if(x.unit){
        return x.name + " (" + (x.quantity) + " " + x.unit +")";
      }else{
        return x.name;
      }
    }) ?? [];
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EquipmentProfile } from 'src/app/models/equipment/equipment.model';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css'],
})
export class EquipmentCardComponent implements OnInit {
  @Input() equipment?: EquipmentProfile;
  @Output() onReloadEquipment = new EventEmitter<boolean>();

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    // This is intentional
  }

  deleteEquipment(id: string): void {
    this.equipmentService.delete(id).subscribe({
      next: (res) => {
        this.onReloadEquipment.emit(true)
      },
      error: (e) => console.error(e),
    });
  }

  getNameEquipments() {
    return (
      this.equipment?.equipments?.map((x) => {
        if (x.unit) {
          return x.name + ' (' + x.quantity + ' ' + x.unit + ')';
        } else {
          return x.name;
        }
      }) ?? []
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from 'src/app/models/equipment/equipment.model';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css'],
})
export class EquipmentCardComponent implements OnInit {
  @Input() equipment?: Equipment;

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {}

  deleteEquipment(id: string): void {
    this.equipmentService.delete(id).subscribe({
      next: (res) => {
        // TODO Emit to reload list recipe
      },
      error: (e) => console.error(e),
    });
  }

  //TODO edit mode
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Equipment } from 'src/app/models/equipment/equipment.model';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
  faSearch = faSearch;
  itemsFloatingButton: MenuItem[] = [];
  equipments?: Equipment[];
  currentEquipment: Equipment = {};
  currentIndex = -1;
  title = '';

  constructor(
    private spinner: NgxSpinnerService,
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.retrieveEquipments();

    this.itemsFloatingButton = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.router.navigate(['/recipes/add']);
        },
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          alert('Reload');
        },
      },
    ];
  }
  addEquipments() {
    this.router.navigate(['/equipments/add']);
  }

  retrieveEquipments(): void {
    this.equipmentService.getAll().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.equipments = data;

          this.spinner.hide();
        }, 700);
      },
      error: (e) => {
        console.error(e);
        this.stopLoading();
      },
    });
  }

  stopLoading() {
    setTimeout(() => {
      this.spinner.hide();
    }, 700);
  }
  searchTitleEquipment(): void {
    this.currentEquipment = {};
    this.currentIndex = -1;
    this.equipmentService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.equipments = data;
      },
      error: (e) => console.error(e),
    });
  }
}

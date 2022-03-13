import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() editMode: boolean = false;
  items: any[] = [];

  ngOnInit() {

    this.items = [
      { label: 'Lista Equipaggiamenti'},
      { label: !this.editMode ? 'Aggiungi Nuovo Profilo' : "Modifica" , current: true}
    ];
  }
}

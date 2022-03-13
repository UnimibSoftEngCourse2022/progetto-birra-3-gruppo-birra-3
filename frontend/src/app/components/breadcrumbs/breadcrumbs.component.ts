import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() showCurrent: boolean = true;
  @Input() basePosition: string = "Lista";
  @Input() currentPosition: string = "";
  @Output() goBack = new EventEmitter<boolean>();
  items: any[] = [];

  ngOnInit() {
    this.items = [
      { label: this.basePosition + " " + this.currentPosition},
      { label: !this.editMode ? 'Aggiungi ' + this.currentPosition : "Modifica " + this.currentPosition, current: true}
    ];
  }
}

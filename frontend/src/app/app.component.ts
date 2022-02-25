import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private primengConfig: PrimeNGConfig) { }

  items: MenuItem[] = [];

  showHamburger: boolean = false;

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'What should I brew today?',
        icon: 'pi pi-fw pi-bolt',
        routerLink: "add"
      },
      {
        label: 'Aggiungi Ricetta',
        icon: 'pi pi-fw pi-plus',
        routerLink: "add"
      },
      {
        label: 'Ricette',
        icon: 'pi pi-fw pi-list',
        routerLink: "recipes"
      }
    ];
  }
}

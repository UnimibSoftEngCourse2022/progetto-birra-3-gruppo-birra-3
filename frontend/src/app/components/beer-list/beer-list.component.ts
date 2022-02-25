import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Beer } from 'src/app/models/beer/beer.model';
import { BeerService } from 'src/app/services/beer/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  beers: Beer[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = "";

  sortKey: string = "";

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerService.getBeers().then(data => this.beers = data);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}

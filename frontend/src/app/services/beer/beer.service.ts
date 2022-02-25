import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from 'src/app/models/beer/beer.model';


@Injectable()
export class BeerService {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  beerNames: string[] = [
    "Bamboo Watch",
    "Black Watch",
    "Blue Band",
    "Blue T-Shirt",
    "Bracelet",
    "Brown Purse",
    "Chakra Bracelet",
    "Galaxy Earrings",
    "Game Controller",
    "Gaming Set",
    "Gold Phone Case",
    "Green Earbuds",
    "Green T-Shirt",
    "Grey T-Shirt",
    "Headphones",
    "Light Green T-Shirt",
    "Lime Band",
    "Mini Speakers",
    "Painted Phone Case",
    "Pink Band",
    "Pink Purse",
    "Purple Band",
    "Purple Gemstone Necklace",
    "Purple T-Shirt",
    "Shoes",
    "Sneakers",
    "Teal T-Shirt",
    "Yellow Earbuds",
    "Yoga Mat",
    "Yoga Set",
  ];

  constructor(private http: HttpClient) { }

  getBeersSmall() {
    return this.http.get<any>('assets/beers-small.json')
      .toPromise()
      .then(res => <Beer[]>res.data)
      .then(data => { return data; });
  }

  getBeers() {
    return this.http.get<any>('assets/beers.json')
      .toPromise()
      .then(res => <Beer[]>res.data)
      .then(data => { return data; });
  }

  getBeersWithOrdersSmall() {
    return this.http.get<any>('assets/beers-orders-small.json')
      .toPromise()
      .then(res => <Beer[]>res.data)
      .then(data => { return data; });
  }

  generatePrduct(): Beer {
    const beer: Beer = {
      id: this.generateId(),
      name: this.generateName(),
      description: "Beer Description",
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: "Beer Category",
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating()
    };

    beer.image = beer.name?.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";
    return beer;
  }

  generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.beerNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }
}
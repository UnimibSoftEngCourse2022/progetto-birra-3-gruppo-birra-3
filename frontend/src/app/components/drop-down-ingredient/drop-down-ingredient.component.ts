import { Component, OnInit } from '@angular/core';
import { DlistIngredientService } from 'src/app/services/dlist/dlist-ingredient.service';

@Component({
  selector: 'app-drop-down-ingredient',
  templateUrl: './drop-down-ingredient.component.html',
  styleUrls: ['./drop-down-ingredient.component.css']
})
export class DropDownIngredientComponent implements OnInit {
  malt : any;
  hop : any;
  yeast : any;
  additive : any;
  sugar : any;
  
  constructor(private dataService : DlistIngredientService) { }

  ngOnInit(): void {
    this.showAllMalt();
    this.showAllHop();
    this.showAllAdditive();
    this.showAllYeast();
    this.showAllSugar();
  }

  showAllMalt(){
    this.malt = this.dataService.getAllMatl();
  }
  showAllHop(){
    this.hop= this.dataService.getAllHop();
  }
  showAllYeast(){
    this.yeast = this.dataService.getAllYeast();
  }
  showAllAdditive(){
    this.additive = this.dataService.getAllAdditive();
  }
  showAllSugar(){
    this.sugar = this.dataService.getAllSugar();
  }
}

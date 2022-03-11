import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";

@Component({
  selector: 'app-drop-down-ingredient',
  templateUrl: './drop-down-ingredient.component.html',
  styleUrls: ['./drop-down-ingredient.component.css']
})
export class DropDownIngredientComponent implements OnInit {
  @Input() type: string = "";
  public data: Ingredient[] = [];
  public selected: Ingredient;

  @Output() selectedIngredient = new EventEmitter<Ingredient>();

  constructor(private ingredientService: IngredientService) {
    this.selected = new Ingredient();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.type) {
      this.ingredientService.getAllByType(this.type).subscribe((data: Ingredient[]) => {
        this.data = data;
      });
    }
  }

  public emitData() {
    this.selectedIngredient.emit(this.selected);
  }
}

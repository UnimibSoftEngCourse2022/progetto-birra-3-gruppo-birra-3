import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";

@Component({
  selector: 'app-drop-down-ingredient',
  templateUrl: './drop-down-ingredient.component.html',
  styleUrls: ['./drop-down-ingredient.component.css']
})
export class DropDownIngredientComponent implements OnInit {
  @Input() type: string | null = null;
  public data: Ingredient[] = [];
  public selected: Ingredient | null = null;

  @Output() selectedIngredient = new EventEmitter<Ingredient | null>();

  constructor(private ingredientService: IngredientService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.type) {
      this.selectedIngredient.emit(null);
      this.ingredientService.getAllByType(this.type).subscribe((data: Ingredient[]) => {
        this.data = data;
      });
    }
  }

  public emitData() {
    if (this.selected)
      this.selectedIngredient.emit(this.selected);
  }
}

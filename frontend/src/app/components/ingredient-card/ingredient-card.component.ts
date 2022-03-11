import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.css'],
})
export class IngredientCardComponent implements OnInit {
  @Input() ingredient?: Ingredient;

  isUpdateQuantity = false;

  amount = this.ingredient?.quantity;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {}

  submitFN(formValue: string) {
    const convertedFormValue = parseInt(formValue);

    this.isUpdateQuantity = false;

    //TODO ZORAN -> Attach new service to update everyingredient
    this.ingredientService
      .update(this.ingredient?._id, convertedFormValue)
      .subscribe(() => {
        this.ingredientService.getAll();
      });
  }
}

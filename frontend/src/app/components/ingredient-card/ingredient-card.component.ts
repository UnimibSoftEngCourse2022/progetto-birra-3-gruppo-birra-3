import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.css'],
})
export class IngredientCardComponent implements OnInit {
  @Input() ingredient?: Ingredient;

  constructor() {}

  ngOnInit(): void {}
}

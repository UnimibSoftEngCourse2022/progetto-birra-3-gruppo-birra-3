import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { ChronologyService } from 'src/app/services/chronology/chronology.service';
import { canBrewRecipe } from 'src/app/services/recipe/helper/recipeHelper';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe?: Recipe;

  canBrewRecipe?: boolean;

  constructor(
    private recipeService: RecipeService,
    private chronologyService: ChronologyService
  ) {}

  ngOnInit(): void {
    const userIngredients = [];
    canBrewRecipe(this.recipe?.ingredients!, []);
  }

  deleteRecipe(id: string): void {
    this.recipeService.delete(id).subscribe({
      next: (res) => {
        // TODO Emit to reload list recipe
      },
      error: (e) => console.error(e),
    });
  }

  brewRecipe(recipeId: string): void {
    console.log(recipeId);
    this.chronologyService.brewBeer(recipeId).subscribe({
      next: (res) => {
        // TODO Emit to reload list recipe
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }
}

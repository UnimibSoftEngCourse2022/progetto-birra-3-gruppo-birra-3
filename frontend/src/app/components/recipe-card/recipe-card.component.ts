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
    //TODO ZORAN -> Come faccio a pescarmi l'user ingredient?
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

  brewRecipe(recipe: Recipe): void {
    //TODO ZORAN -> la implementazione è corretta?
    //Voglio che dopo che faccio brewBeer, mi rifetchi il brewing history
    console.log('test');
    this.recipeService.brewBeer(recipe).subscribe(() => {
      //TODO
      //RIFETCHARE USER.
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { environment } from 'src/environments/environment';
import {RecipeService} from "../recipe/recipe.service";

const baseUrl = environment.backendApi + 'brewtoday';

@Injectable({
  providedIn: 'root',
})
export class BrewTodayService {
  constructor(private http: HttpClient, private recipeSerice: RecipeService) {}

  whatShouldIBrewToday(userRecipes: Recipe[], userIngredients: Ingredient[]) {
    // Tiro fuori solo le ricette ritornabili
    let filteredRecipes = userRecipes.filter((recipe) => {
      let recipeIngredients = recipe.ingredients;
      return this.recipeSerice.canBrewRecipe(recipeIngredients!, userIngredients);
    });

    if (filteredRecipes.length === 0) {
      return null;
    }

    let bestCandidate: Recipe = filteredRecipes.reduce(
      (previousRecipe, currentRecipe) => {
        let previousRecipeIngrQuantityVal =
          previousRecipe.ingredients?.reduce((prevVal, nextIngr) => {
            return prevVal + nextIngr.quantity;
          }, 0);
        let currentRecipeIngrQuantityVal = currentRecipe.ingredients?.reduce(
          (prevVal, nextIngr) => {
            return prevVal + nextIngr.quantity;
          },
          0
        );

        if (currentRecipeIngrQuantityVal! < previousRecipeIngrQuantityVal!) {
          return currentRecipe;
        } else {
          return previousRecipe;
        }
      },
      filteredRecipes[0]
    );

    return bestCandidate;
  }
}

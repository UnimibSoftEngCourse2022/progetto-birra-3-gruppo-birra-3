import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { min, Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { environment } from 'src/environments/environment';
import { canBrewRecipe } from '../recipe/helper/recipeHelper';

const baseUrl = environment.backendApi + 'brewtoday';

@Injectable({
  providedIn: 'root',
})
export class BrewTodayService {
  constructor(private http: HttpClient) {}

  WhatShouldIBrewToday(): Observable<Recipe[]> {
    //controlli
    return this.http.get<Recipe[]>(baseUrl);
  }
}
export function whatShouldIBrewToday(
  userRecipes: Recipe[],
  userIngredients: Ingredient[]
) {
  //Tiro fuori solo le ricette ritornabili
  const filteredRecipes = userRecipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients;

    return canBrewRecipe(recipeIngredients!, userIngredients);
  });
  console.log('filtered rec', filteredRecipes);
  if (filteredRecipes.length === 0) {
    return null;
  }

  const bestCandidate: Recipe = filteredRecipes.reduce(
    (previousRecipe, currentRecipe) => {
      const previousRecipeIngrQuantityVal = previousRecipe.ingredients?.reduce(
        (prevVal, nextIngr) => {
          return prevVal + nextIngr.quantity!;
        },
        0
      );
      const currentRecipeIngrQuantityVal = currentRecipe.ingredients?.reduce(
        (prevVal, nextIngr) => {
          return prevVal + nextIngr.quantity!;
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

//WHAT SHOULD I BREW TODAY -> TIRA FUORI UNA RICETTA

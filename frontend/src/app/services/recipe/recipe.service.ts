import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { environment } from '../../../environments/environment';
import { Recipe } from '../../models/recipe/recipe.model';
import {
  calculateBeerColor,
  calculateSRM,
  getMaltLovibond,
  getMCU,
} from './helper/beerColorHelper';

const baseUrl = environment.backendApi + 'recipes';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(baseUrl);
  }

  get(id: any): Observable<Recipe> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${baseUrl}?title=${title}`);
  }

  brewBeer(id: any): Observable<Recipe> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getNextBatchList(recipeIngredients: Ingredient[]): Ingredient[] {
    const userCurrentIgrendients: Ingredient[] = [];

    const missingIngredients: Ingredient[] = [];

    //Ciclo su tutti gli ingredienti della ricetta
    recipeIngredients.forEach((recipeIngredient) => {
      //Controllo se l'igrediente è presente
      const presentIngredient = userCurrentIgrendients.find(
        (userIngredient) => {
          return (
            userIngredient.name === recipeIngredient.name &&
            userIngredient.quantity === recipeIngredient.quantity
          );
        }
      );

      //Se non è presente, allora lo aggiungo alla lista degli ingredienti mancanti
      if (!presentIngredient) {
        missingIngredients.push(presentIngredient!);
      } else {
        //L'ingrediente è presente, non basta per fare la ricetta.
        if (recipeIngredient.quantity! > presentIngredient.quantity!) {
          missingIngredients.push({
            name: recipeIngredient.name,
            type: recipeIngredient.type,
            quantity: recipeIngredient.quantity! - presentIngredient.quantity!,
          });
        }
      }
    });

    return missingIngredients;
  }

  getBeerColor(batchSize: number, malt: string, maltAmount: number) {
    const maltLovibond = getMaltLovibond(malt);
    const MCU = getMCU(maltLovibond, maltAmount, batchSize);
    const SRM = calculateSRM(MCU);
    const beerColor = calculateBeerColor(SRM);

    return beerColor;
  }
}

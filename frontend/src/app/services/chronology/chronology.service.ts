import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BREW_HISTORY_ENDPOINTS from 'src/app/utils/brewHistoryEndpoints';
import {Recipe} from "../../models/recipe/recipe.model";

const baseUrl = environment.backendApi + 'chronology';

@Injectable({
  providedIn: 'root',
})
export class ChronologyService {
  constructor(private http: HttpClient) {}

  brewBeer(recipeId: string): Observable<any> {
    return this.http.get(BREW_HISTORY_ENDPOINTS.BREW_BEER(recipeId));
  }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(BREW_HISTORY_ENDPOINTS.BASE_URL);
  }
}

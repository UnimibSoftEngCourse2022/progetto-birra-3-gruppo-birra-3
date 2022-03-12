import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Ingredient, IngredientInterface} from 'src/app/models/ingredient/ingredient.model';
import { environment } from 'src/environments/environment';
import {IngredientRef} from "../../enum/ingredientRef";

const baseUrl = environment.backendApi + 'ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(baseUrl);
  }

  get(id: any): Observable<IngredientInterface> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any, type: IngredientRef): Observable<any> {
    let url =  baseUrl +  (type === IngredientRef.TO_RECIPE ?"/add-to-recipe" : "/add-to-user");

    return this.http.post(url, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title: any): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${baseUrl}?title=${title}`);
  }

  getAllByType(type: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('../../../assets/fakeDB/'+ type +'.json');
  }
}

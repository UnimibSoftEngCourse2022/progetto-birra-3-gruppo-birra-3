import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Recipe } from '../../models/recipe/recipe.model';

const baseUrl = environment.backendApi + 'recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }
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
}
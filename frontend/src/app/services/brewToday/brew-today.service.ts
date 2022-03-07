import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.backendApi + 'brewtoday';


@Injectable({
  providedIn: 'root'
})
export class BrewTodayService {

  constructor(private http: HttpClient) { }

  WhatShouldIBrewToday(): Observable<Recipe[]> {
    //controlli
    return this.http.get<Recipe[]>(baseUrl);
  }
}

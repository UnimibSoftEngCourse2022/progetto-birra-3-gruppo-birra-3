import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = environment.backendApi + 'chronology';

@Injectable({
  providedIn: 'root',
})
export class ChronologyService {
  constructor(private http: HttpClient) {}
}

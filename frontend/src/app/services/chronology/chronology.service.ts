import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BREW_HISTORY_ENDPOINTS from 'src/app/utils/brewHistoryEndpoints';

const baseUrl = environment.backendApi + 'chronology';

@Injectable({
  providedIn: 'root',
})
export class ChronologyService {
  constructor(private http: HttpClient) {}

  brewBeer(recipeId: string): Observable<any> {
    return this.http.post(BREW_HISTORY_ENDPOINTS.BREW_BEER, recipeId);
  }
}

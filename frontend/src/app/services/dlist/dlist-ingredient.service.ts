import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import malt  from '../../../assets/fakeDB/malt.json';

@Injectable({
  providedIn: 'root'
})
export class DlistIngredientService {

  constructor(private http : HttpClient) { }
  
  malt = 'fakeDB/malt.json';
  hop= 'fakeDB/hops.json';
  yeast = 'fakeDB/yeasts.json';
  additive= 'fakeDB/additives.json';
  sugar = 'fakeDB/sugar.json';

  
  getAllMatl () : any {
    return this.malt;
  }
  getAllHop () : any {
    return this.hop;
  }
  getAllYeast () : any {
    return this.yeast;
  }
  getAllSugar () : any {
    return this.sugar;
  }
  getAllAdditive () : any {
    return this.additive;
  }


}

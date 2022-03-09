import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { ChronologyService } from 'src/app/services/chronology/chronology.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe?: Recipe;

  constructor(
   private recipeService : RecipeService,
   private chronologyService : ChronologyService,
  ) { }

  ngOnInit(): void {
  }

  deleteRecipe(id: string): void {
    this.recipeService.delete(id)
      .subscribe({
        next: (res) => {
          // TODO Emit to reload list recipe
        },
        error: (e) => console.error(e)
      });
  }

  brewRecipe(id: string): void {
    console.log("test");
    this.chronologyService.brew(id);
  }
  
}

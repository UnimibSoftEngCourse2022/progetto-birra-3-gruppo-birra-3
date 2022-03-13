import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { ChronologyService } from 'src/app/services/chronology/chronology.service';
import { canBrewRecipe } from 'src/app/services/recipe/helper/recipeHelper';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe?: Recipe;
  @Input() isChronology: boolean = false;
  @Output() onReload = new EventEmitter<boolean>();

  canBrewRecipe?: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private recipeService: RecipeService,
    private chronologyService: ChronologyService
  ) {}

  ngOnInit(): void {
    const userIngredients = [];
    this.canBrewRecipe = canBrewRecipe(this.recipe?.ingredients!, []);
  }

  deleteRecipe(id: string): void {
    this.spinner.show();
    this.recipeService.delete(id).subscribe({
      next: (res) => {
        this.onReload.emit(true);
      },
      error: (e) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 350);
        console.error(e);
      },
    });
  }

  brewRecipe(recipeId: string): void {
    console.log(recipeId);
    this.chronologyService.brewBeer(recipeId).subscribe({
      next: (res) => {
        this.onReload.emit(true);
      },
      error: (e) => console.error(e),
    });
  }

  getNameIngredients() {
    if (this.recipe) {
      return this.recipe.ingredients?.map((x) => x.name);
    }

    return [];
  }
}

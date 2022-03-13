import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Recipe} from 'src/app/models/recipe/recipe.model';
import {ChronologyService} from 'src/app/services/chronology/chronology.service';
import {RecipeService} from 'src/app/services/recipe/recipe.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe?: Recipe;
  @Input() bestCandidateId?: string | null = null;
  @Input() isChronology: boolean = false;
  @Input() canBrew: boolean = false;
  @Output() onReload = new EventEmitter<boolean>();

  constructor(
    private spinner: NgxSpinnerService,
    private recipeService: RecipeService,
    private chronologyService: ChronologyService
  ) {
  }

  ngOnInit(): void {

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

    this.chronologyService.brewBeer(recipeId).subscribe({
      next: (res) => {
        console.log(res);
        this.onReload.emit(true);
      },
      error: (e) => console.error(e),
    });
  }

  getNameIngredients() {
    if (this.recipe) {
      return this.recipe.ingredients?.map(x => x.name)
    }

    return [];
  }
}

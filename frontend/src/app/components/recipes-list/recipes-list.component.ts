import {Component, OnInit, Input} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {RecipeService} from 'src/app/services/recipe/recipe.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Recipe} from 'src/app/models/recipe/recipe.model';
import {ChronologyService} from "../../services/chronology/chronology.service";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";
import {BrewTodayService} from "../../services/brewToday/brew-today.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  @Input() isChronology: boolean = false;
  @Input() isBrewPage: boolean = false;
  public bestCandidateRecipeId: string | null = null;

  faSearch = faSearch;
  itemsFloatingButton: MenuItem[] = [];
  userIngredients?: Ingredient[] = [];

  recipes?: Recipe[];
  _recipes?: Recipe[];
  currentRecipe: Recipe = {};
  currentIndex = -1;
  title = '';

  constructor(
    private spinner: NgxSpinnerService,
    private brewTodayService: BrewTodayService,
    private chronologyService: ChronologyService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.retrieveRecipes();

    this.itemsFloatingButton = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.router.navigate(['/recipes/add']);
        },
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          alert('Reload');
        },
      },
    ];
  }

  addRecipe() {
    this.router.navigate(['/recipes/add']);
  }

  stopLoading() {
    setTimeout(() => {
      this.spinner.hide();
    }, 700);
  }

  retrieveRecipes(): void {
    this.spinner.show();

    if (this.isChronology) {
      this.chronologyService.getAll().subscribe({
        next: (data) => {
          console.log(data);
          setTimeout(() => {
            this._recipes = data;
            this.recipes = this._recipes;

            this.spinner.hide();
          }, 700);
        },
        error: (e) => {
          console.error(e);
          this.stopLoading();
        },
      });
    } else {
      this.recipeService.getAll().subscribe({
        next: (data) => {
          this._recipes = data;
          this.retrieveUserIngredients();
        },
        error: (e) => {
          console.error(e);
          this.stopLoading();
        },
      });
    }
  }

  retrieveUserIngredients(): void {
    this.spinner.show();

    if (!this.isChronology) {
      this.ingredientService.getAll().subscribe({
        next: (data) => {
          setTimeout(() => {
            this.userIngredients = data;

            this.spinner.hide();

            if (this.isBrewPage) {
              this.loadOnlyBrewRecipe();
              this.getBestCandidateRecipe();
            }else{
              this.recipes = this._recipes;
            }
          }, 700);
        },
        error: (e) => {
          console.error(e);
          this.stopLoading();
        },
      });
    }
  }

  loadOnlyBrewRecipe() {
    if (this.userIngredients && this.userIngredients.length > 0 && this._recipes && this._recipes.length > 0) {
      this.recipes = this._recipes.filter((x): any => {
        let canBrew = this.recipeService.canBrewRecipe(x.ingredients || [], this.userIngredients || []);
        if (canBrew) {
          return x;
        }
      });
    }
  }

  refreshList(): void {
    this.retrieveRecipes();
    this.currentRecipe = {};
    this.currentIndex = -1;
  }

  setActiveRecipe(recipe: Recipe, index: number): void {
    this.currentRecipe = recipe;
    this.currentIndex = index;
  }

  removeAllRecipes(): void {
    this.recipeService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchTitle(): void {
    this.currentRecipe = {};
    this.currentIndex = -1;
    this.recipeService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (e) => console.error(e),
    });
  }

  realodList(event: boolean) {
    if (event) {
      this.refreshList();
    }
  }

  getCanBrew(recipe: Recipe) {
    if (this.userIngredients && this.userIngredients.length > 0 && recipe.ingredients && recipe.ingredients.length > 0) {
      return this.recipeService.canBrewRecipe(recipe.ingredients || [], this.userIngredients);
    }

    return false;
  }

  getBestCandidateRecipe() {
    this.bestCandidateRecipeId = null;

    if (this.userIngredients && this.userIngredients.length > 0 && this.recipes && this.recipes.length > 0) {
      let recipe: Recipe | null = this.brewTodayService.whatShouldIBrewToday(this.recipes || [], this.userIngredients);
      this.bestCandidateRecipeId = recipe?._id || null;
    }
  }
}


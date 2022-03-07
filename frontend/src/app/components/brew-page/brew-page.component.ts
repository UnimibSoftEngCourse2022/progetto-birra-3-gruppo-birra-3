import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-brew-page',
  templateUrl: './brew-page.component.html',
  styleUrls: ['./brew-page.component.css']
})
export class BrewPageComponent implements OnInit {
  faSearch = faSearch;
  itemsFloatingButton: MenuItem[] = [];

  recipes?: Recipe[];
  currentRecipe: Recipe = {};
  currentIndex = -1;
  title = '';
  constructor(
    private spinner: NgxSpinnerService,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.retrieveRecipes();

    this.itemsFloatingButton = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.router.navigate(['/recipes/add']);
        }
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          alert("Reload");
        }
      }
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
    this.recipeService.getAll()
      .subscribe({
        next: (data) => {
          setTimeout(() => {
            this.recipes = data;
            this.spinner.hide();
          }, 700);
        },
        error: (e) => {
          console.error(e);
          this.stopLoading();
        }
      });
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
    this.recipeService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentRecipe = {};
    this.currentIndex = -1;
    this.recipeService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.recipes = data;
        },
        error: (e) => console.error(e)
      });
  }

  deleteRecipe(id: string): void {
    this.recipeService.delete(id)
      .subscribe({
        next: (res) => {
          this.recipes = this.recipes?.filter(x => x._id != id);
        },
        error: (e) => console.error(e)
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Recipe } from 'src/app/models/recipe/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
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
  
}
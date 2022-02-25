import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
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
  constructor(private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
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

  retrieveRecipes(): void {
    this.recipeService.getAll()
      .subscribe({
        next: (data) => {
          this.recipes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
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
          console.log(res);
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
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  deleteRecipe(id: string): void {
    this.recipeService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.recipes = this.recipes?.filter(x => x.id != id);
        },
        error: (e) => console.error(e)
      });
  }
}
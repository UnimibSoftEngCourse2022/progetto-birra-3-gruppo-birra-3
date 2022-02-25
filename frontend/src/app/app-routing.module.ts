import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'beer', component: BeerListComponent },
  {
    path: 'recipes', children: [
      { path: '', component: RecipesListComponent },
      { path: 'edit/:id', component: RecipeDetailsComponent },
      { path: 'add', component: AddRecipeComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

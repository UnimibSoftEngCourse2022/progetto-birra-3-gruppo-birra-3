import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/helpers';
import { BrewPageComponent } from './components/brew-page/brew-page.component';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { Error404Component } from './components/error404/error404.component';
import { FormEquipmentComponent } from './components/form-equipment/form-equipment.component';
import { FormIngredientComponent } from './components/form-ingredient/form-ingredient.component';
import { FormRecipeComponent } from './components/form-recipe/form-recipe.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { LoginComponent } from './view/login/login.component';
import { SignUpComponent } from './view/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'recipes', children: [
      { path: '', canActivate: [AuthGuard], component: RecipesListComponent },
      { path: 'add', canActivate: [AuthGuard], component: FormRecipeComponent },
      {
        path: ':id',
        children: [
          { path: '', component: FormRecipeComponent, canActivate: [AuthGuard] },
          { path: 'edit', component: FormRecipeComponent, canActivate: [AuthGuard] },
        ]
      }
    ]
  },
  {
    path: 'equipments', children: [
      { path: '', canActivate: [AuthGuard], component: RecipesListComponent },
      { path: 'add', canActivate: [AuthGuard], component: FormEquipmentComponent },
      {
        path: ':id',
        children: [
          { path: '', component: FormEquipmentComponent, canActivate: [AuthGuard] },
          { path: 'edit', component: FormEquipmentComponent, canActivate: [AuthGuard] },
        ]
      }
    ]
  },
  {
    path: 'ingredients', children: [
      { path: '', canActivate: [AuthGuard], component: RecipesListComponent },
      { path: 'add', canActivate: [AuthGuard], component: FormIngredientComponent },
      {
        path: ':id',
        children: [
          { path: '', component: FormRecipeComponent, canActivate: [AuthGuard] },
          { path: 'edit', component: FormRecipeComponent, canActivate: [AuthGuard] },
        ]
      }
    ]
    
  },
  {
    path: 'brewtoday', children: [
      { path: '', canActivate: [AuthGuard], component: BrewPageComponent }, 
    ] 
  },
  { path: 'chronology', component: ChronologyComponent},
  { path: '**', component: Error404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

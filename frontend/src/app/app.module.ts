import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { BeerService } from './services/beer/beer.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CascadeSelectModule } from 'primeng/cascadeselect';
@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeDetailsComponent,
    RecipesListComponent,
    BeerListComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    ToastModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    RippleModule,
    DataViewModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    SpeedDialModule,
    InputTextModule,
    ButtonModule,
    FontAwesomeModule,
    CascadeSelectModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [BeerService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

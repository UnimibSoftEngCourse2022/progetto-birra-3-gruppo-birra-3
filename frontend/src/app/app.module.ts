import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecipesListComponent} from './components/recipes-list/recipes-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SpeedDialModule} from 'primeng/speeddial';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {LoginComponent} from './view/login/login.component';
import {ErrorInterceptor, JwtInterceptor} from './auth/helpers';
import {HeaderComponent} from './components/header/header.component';
import {MenuModule} from 'primeng/menu';
import {Error404Component} from './components/error404/error404.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormRecipeComponent} from './components/form-recipe/form-recipe.component';
import {SignUpComponent} from './view/sign-up/sign-up.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {FormIngredientComponent} from './components/form-ingredient/form-ingredient.component';
import {FormEquipmentComponent} from './components/form-equipment/form-equipment.component';
import {BrewPageComponent} from './components/brew-page/brew-page.component';
import {DropDownIngredientComponent} from './components/drop-down-ingredient/drop-down-ingredient.component';
import {DropDownEquipmentComponent} from './components/drop-down-equipment/drop-down-equipment.component';
import {ChronologyComponent} from './components/chronology/chronology.component';
import {RecipeCardComponent} from './components/recipe-card/recipe-card.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {EquipmentCardComponent} from './components/equipment-card/equipment-card.component';
import {EquipmentListComponent} from './components/equipments-list/equipment-list.component';
import {IngredientCardComponent} from './components/ingredient-card/ingredient-card.component';
import {TableModule} from 'primeng/table';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ListboxModule} from 'primeng/listbox';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    FormRecipeComponent,
    RecipesListComponent,
    BreadcrumbsComponent,
    LoginComponent,
    HeaderComponent,
    Error404Component,
    SignUpComponent,
    FormIngredientComponent,
    FormEquipmentComponent,
    BrewPageComponent,
    DropDownIngredientComponent,
    DropDownEquipmentComponent,
    ChronologyComponent,
    RecipeCardComponent,
    EquipmentCardComponent,
    EquipmentListComponent,
    IngredientCardComponent
  ],
  imports: [
    TooltipModule,
    ListboxModule,
    BreadcrumbModule,
    TableModule,
    InputNumberModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ToastModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    RippleModule,
    DataViewModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    MenubarModule,
    SpeedDialModule,
    InputTextModule,
    ButtonModule,
    FontAwesomeModule,
    CascadeSelectModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}

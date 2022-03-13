import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {
    // This is intentional
  }
}

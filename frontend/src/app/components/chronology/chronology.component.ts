import { Component, OnInit } from '@angular/core';
import { ChronologyService } from 'src/app/services/chronology/chronology.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe/recipe.model';

@Component({
  selector: 'app-chronology',
  templateUrl: './chronology.component.html',
  styleUrls: ['./chronology.component.css'],
})
export class ChronologyComponent implements OnInit {
  recipes?: Recipe[];

  constructor(
    private chronologyService: ChronologyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //This is intentional
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentRecipe: Recipe = {
    title: '',
    color: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRecipe(this.route.snapshot.params["id"]);
    }
  }

  getRecipe(id: string): void {
    this.recipeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRecipe = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateRecipe(): void {
    this.message = '';
    this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Ricetta modificata con successo!';
          this.goBack();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
        },
        error: (e) => console.error(e)
      });
  }

  deleteRecipe(): void {
    this.recipeService.delete(this.currentRecipe.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/recipes']);
        },
        error: (e) => console.error(e)
      });
  }

  goBack() {
    this.router.navigate(['/recipes']);
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { MessageService } from 'primeng/api';
interface Colors {
  name: string,
  code: string
}
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe = {
    title: '',
    color: '',
    description: '',
    published: false
  };
  submitted = false;

  colors: any[] = [];

  selectedColor: Colors = {
    name: "",
    code: ""
  };

  constructor(private recipeService: RecipeService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.colors = [
      {
        name: "#F8F753",
        code: "#F8F753"
      },
      {
        name: "#F6F513",
        code: "#F6F513"
      },
      {
        name: "#ECE61A",
        code: "#ECE61A"
      },
      {
        name: "#D5BC26",
        code: "#D5BC26"
      },
      {
        name: "#BF923B",
        code: "#BF923B"
      },
      {
        name: "#BF813A",
        code: "#BF813A"
      },
      {
        name: "#BC6733",
        code: "#BC6733"
      },
      {
        name: "#8D4C32",
        code: "#8D4C32"
      },
      {
        name: "#5D341A",
        code: "#5D341A"
      },
      {
        name: "#261716",
        code: "#261716"
      },
      {
        name: "#0F0B0A",
        code: "#0F0B0A"
      },
      {
        name: "#080707",
        code: "#080707"
      },
      {
        name: "#030403",
        code: "#030403"
      }];
  }

  saveRecipe(): void {
    const data = {
      title: this.recipe.title,
      color: this.selectedColor.code,
      description: this.recipe.description
    };
    this.recipeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.goBack();
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
        },
        error: (e) => console.error(e)
      });
  }

  newRecipe(): void {
    this.submitted = false;
    this.recipe = {
      title: '',
      description: '',
      published: false
    };
  }

  goBack() {
    this.router.navigate(['/recipes']);
  }
}
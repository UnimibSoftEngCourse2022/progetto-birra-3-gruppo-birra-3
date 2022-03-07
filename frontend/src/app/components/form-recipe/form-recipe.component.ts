import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Recipe } from 'src/app/models/recipe/recipe.model';

export interface Colors {
  name: string,
  code: string
}
@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrls: ['./form-recipe.component.css']
})
export class FormRecipeComponent implements OnInit {
  @Input() id: string | null = null;
  public editMode: boolean = false;
  public form!: FormGroup;
  public loading: boolean = true;

  get f() {
    return this.form.controls;
  }

  public model: Recipe;

  submitted = false;

  colors: any[] = [];

  selectedColor: Colors | null = null;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private recipeService: RecipeService, private messageService: MessageService, private router: Router) {
    this.model = new Recipe();
  }

  ngOnInit() {
    if (this.id || this.route.snapshot.params["id"]) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }

    if (this.editMode) {
      this.spinner.show();
    }

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

    this.submitted = false;
    this.model.title = "";
    this.model.description = "";
    this.model.color = "";

    this.form = this._formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      color: [null, [Validators.required]]
    });

    if (this.editMode) {
      this.getRecipe(this.route.snapshot.params["id"] || this.id);
    } else {
      this.stopLoading();
    }
  }

  stopLoading() {
    setTimeout(() => {
      this.spinner.hide();
    }, 700);
  }

  getRecipe(id: string): void {
    this.recipeService.get(id)
      .subscribe({
        next: (data) => {
          this.editMode = true;

          setTimeout(() => {
            this.model = data;
            this.selectedColor = this.colors.find(x => x.code == this.model.color);
            this.spinner.hide();
          }, 700);
        },
        error: (e) => {
          setTimeout(() => {
            console.error(e)
            this.editMode = false;
            this.spinner.hide();
          }, 700);
        }
      });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let data = {
      title: this.model.title,
      color: this.selectedColor!.code,
      description: this.model.description
    };

    if (this.editMode) {
      this.recipeService.update(this.model._id, data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            this.goBack();
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
          },
          error: (e) => console.error(e)
        });
    } else {
      this.recipeService.create(data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            this.goBack();
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
          },
          error: (e) => console.error(e)
        });
    }
  }

  goBack() {
    this.router.navigate(['/recipes']);
  }

  deleteRecipe(): void {
    if (this.editMode) {
      this.recipeService.delete(this.model._id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/recipes']);
          },
          error: (e) => console.error(e)
        });
    }
  }
}
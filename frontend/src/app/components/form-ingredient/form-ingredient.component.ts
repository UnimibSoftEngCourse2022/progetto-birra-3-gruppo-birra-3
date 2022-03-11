import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { INGREDIENTS_ENUM } from '../../enum/ingredients';

@Component({
  selector: 'app-form-ingredient',
  templateUrl: './form-ingredient.component.html',
  styleUrls: ['./form-ingredient.component.css'],
})
export class FormIngredientComponent implements OnInit {
  @Input() id: string | null = null;
  public editMode: boolean = false;
  public form!: FormGroup;
  public loading: boolean = true;

  get f() {
    return this.form.controls;
  }

  public model: Ingredient;
  loadData: boolean = true;

  public _ingredients: Ingredient[];

  public selectedType: any;

  public types: any = [
    {
      name: INGREDIENTS_ENUM.MALT,
    },
    {
      name: INGREDIENTS_ENUM.HOP,
    },
    {
      name: INGREDIENTS_ENUM.SUGAR,
    },
    {
      name: INGREDIENTS_ENUM.ADDITIVE,
    },
    {
      name: INGREDIENTS_ENUM.YEAST,
    },
  ];

  submitted = false;

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private ingredientService: IngredientService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.model = new Ingredient();
    this._ingredients = [];
    this.selectedType = '';
  }

  //BEGIN INIT
  ngOnInit() {
    if (this.id || this.route.snapshot.params['id']) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }

    if (this.editMode) {
      this.spinner.show();
    }

    this.submitted = false;
    this.model.name = '';

    this.form = this._formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (this.editMode) {
      this.getIngredient(this.route.snapshot.params['id'] || this.id);
    } else {
      this.stopLoading();
    }
    this._ingredients.push({
      name: 'POPPO',
      quantity: 1,
      type: 'malt',
    });
  }
  //END ON INIT

  public addIngredients() {
    // TODO Add New Form
  }

  stopLoading() {
    setTimeout(() => {
      this.spinner.hide();
    }, 700);
  }

  getIngredient(id: string): void {
    this.ingredientService.get(id).subscribe({
      next: (data) => {
        this.editMode = true;

        setTimeout(() => {
          this.model = data;
          this.spinner.hide();
        }, 700);
      },
      error: (e) => {
        setTimeout(() => {
          console.error(e);
          this.editMode = false;
          this.spinner.hide();
        }, 700);
      },
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
      name: this.model.name,
    };

    if (this.editMode) {
      this.ingredientService.update(this.model._id, data).subscribe({
        next: (res) => {
          this.submitted = true;
          this.goBack();
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'Via MessageService',
          });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.ingredientService.create(data).subscribe({
        next: (res) => {
          this.submitted = true;
          this.goBack();
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'Via MessageService',
          });
        },
        error: (e) => console.error(e),
      });
    }
  }

  goBack() {
    this.router.navigate(['/ingredients']);
  }

  deleteIngredient(): void {
    if (this.editMode) {
      this.ingredientService.delete(this.model._id).subscribe({
        next: (res) => {
          this.router.navigate(['/ingredients']);
        },
        error: (e) => console.error(e),
      });
    }
  }

  //TODO
  addIngredient(): void {}

  //TODO
  addIngredientList(): void {}

  public setSelected(event: any) {
    console.log(event);
  }

  public onChangeType() {
    this.loadData = true;

    setTimeout(() => {
      this.loadData = false;
    }, 250);
  }
}

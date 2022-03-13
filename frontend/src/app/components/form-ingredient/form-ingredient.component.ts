import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {Ingredient} from 'src/app/models/ingredient/ingredient.model';
import {IngredientService} from 'src/app/services/ingredient/ingredient.service';
import {INGREDIENTS_ENUM} from '../../enum/ingredients';
import {IngredientRef} from "../../enum/ingredientRef";
import {Table} from "primeng/table";

@Component({
  selector: 'app-form-ingredient',
  templateUrl: './form-ingredient.component.html',
  styleUrls: ['./form-ingredient.component.css'],
})
export class FormIngredientComponent implements OnInit {
  @Input() id: string | null = null;
  @Input() showBreadcrumbs: boolean = true;
  @Input() fromRecipe: boolean = false;
  @Input() editMode: boolean = false;
  @Input() ingredients: Ingredient[];
  @Output() addedIngredient = new EventEmitter<Ingredient>();

  public loading: boolean = true;

  public model: Ingredient | null = null;

  loadData: boolean = true;

  public _ingredients: Ingredient[];

  public clonedIngredients: { [s: string]: Ingredient; } = {};

  public types: any = [
    INGREDIENTS_ENUM.MALT,
    INGREDIENTS_ENUM.HOP,
    INGREDIENTS_ENUM.SUGAR,
    INGREDIENTS_ENUM.ADDITIVE,
    INGREDIENTS_ENUM.ADDITIVE
  ];

  submitted = false;

  public displayModal: boolean = false;

  newIngrediet: any;

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.initVal();
    this._ingredients = [];
  }

  ngOnInit() {
    this.loading = true;

    if (this.id || this.route.snapshot.params['id']) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }

    if (this.editMode) {
      this.spinner.show();
    }

    this.initVal();

    if (!this.fromRecipe) {
      this.loadIngredients();
    } else {
      this._ingredients = this.ingredients || [];
    }

    console.log(this.ingredients);

    if (this.editMode && !this.fromRecipe) {
      this.getIngredient(this.route.snapshot.params['id'] || this.id);
    } else {
      this.stopLoading();
    }
  }

  initVal() {
    this.model = new Ingredient();

    this.submitted = false;
    this.loading = false;
    this.loadData = false;

    this.stopLoading();
  }

  public loadIngredients() {
    this.ingredientService.getAll().subscribe({
      next: (res) => {
        this._ingredients = res;
      },
      error: (e) => console.error(e),
    });
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
          this.model = data as Ingredient;
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
    this.loading = true;

    if (this.model) {
      if (this.fromRecipe) {
        if (!this.editMode)
          this._ingredients.push(this.model);

        this.addedIngredient.emit(this.model);
        this.displayModal = false;
      } else {
        if (this.editMode) {
          this.ingredientService.update(this.model._id, this.model).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Service Message',
                detail: 'Via MessageService',
              });
            },
            error: (e) => console.error(e),
          });
        } else {
          let data = {
            name: this.model.name,
            type: this.model.type,
            quantity: this.model.quantity,
          }

          this.ingredientService.create(data, IngredientRef.TO_USER).subscribe({
            next: (res) => {
              console.log(res);
              this._ingredients.push(res);

              this.spinner.show();
              this.initVal();
              this.displayModal = false;
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
    }
  }

  goBack() {
    this.router.navigate(['/ingredients']);
  }

  deleteIngredient(): void {
    if (this.editMode && this.model) {
      this.ingredientService.delete(this.model._id).subscribe({
        next: (res) => {
          this.router.navigate(['/ingredients']);
        },
        error: (e) => console.error(e),
      });
    }
  }

  public setNameSelected(event: Ingredient | null) {
    if (this.model) {
      this.model.name = event ? event.name : null;
    }
  }

  public onChangeType() {
    this.loadData = true;

    setTimeout(() => {
      this.loadData = false;
    }, 250);
  }

  public onRowEditInit(ingredient: Ingredient) {
    this.clonedIngredients[ingredient._id] = {...ingredient};
  }

  onRowEditSave(ingredient: Ingredient) {
    if (!this.fromRecipe) {
      if (ingredient && ingredient.quantity > 0) {
        this.ingredientService.update(ingredient._id, ingredient).subscribe({
          next: (res) => {
            delete this.clonedIngredients[ingredient._id];
            this.messageService.add({
              severity: 'success',
              summary: 'Ok',
              detail: 'Via MessageService',
            });
          },
          error: (e) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Si sono verificati degli errori'});
          },
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Si sono verificati degli errori'});
      }
    }
  }

  onRowEditCancel(ingredient: Ingredient, index: number) {
    this._ingredients[index] = this.clonedIngredients[ingredient._id];
    delete this.clonedIngredients[ingredient._id];
  }

  clear(table: Table) {
    table.clear();
  }

  showModalDialog() {
    this.model = new Ingredient();
    this.displayModal = true;
  }

  isDisabled() {
    if (this.model &&
      this.model.quantity && this.model.quantity > 0 &&
      this.model.name && this.model.name !== "" &&
      this.model.type && this.model.type !== ""
    ) {
      return false
    }

    return true;
  }
}

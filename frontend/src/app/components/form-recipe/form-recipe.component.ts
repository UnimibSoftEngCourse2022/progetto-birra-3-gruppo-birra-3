import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from 'src/app/services/recipe/recipe.service';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from "ngx-spinner";
import {Recipe} from 'src/app/models/recipe/recipe.model';
import {EquipmentService} from "../../services/equipment/equipment.service";
import {EquipmentProfile} from "../../models/equipment/equipment.model";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {TYPE_UNIQUE_NAME_ENUM, UNIT_OF_MEASUREMENT_ENUM} from "../../enum/equipmentUnits";
import {INGREDIENTS_ENUM} from "../../enum/ingredients";

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrls: ['./form-recipe.component.css']
})
export class FormRecipeComponent implements OnInit {
  @Input() id: string | null = null;
  public editMode: boolean = false;
  public equipmentProfiles: EquipmentProfile[] = [];
  public equipmentProfileSelected: EquipmentProfile | null = null;
  public form!: FormGroup;
  public loading: boolean = true;
  public loadingModel: boolean = true;

  get f() {
    return this.form.controls;
  }

  public model: Recipe;

  submitted = false;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private recipeService: RecipeService, private equipmentService: EquipmentService, private messageService: MessageService, private router: Router) {
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

    this.submitted = false;
    this.model.title = "";
    this.model.description = "";
    this.model.color = "";

    this.form = this._formBuilder.group({
      title: [null, [Validators.required]],
      description: [null],
      equipmentProfileId: [null, [Validators.required]]
    });

    if (this.editMode) {
      this.getRecipe(this.route.snapshot.params["id"] || this.id);
    } else {
      this.loadingModel = false;
      this.stopLoading();
    }

    this.loadEquipmentsProfile();
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
            this.equipmentProfileSelected = this.equipmentProfiles.find(x => x._id == this.model.equipmentProfileId) ?? new EquipmentProfile();
            this.spinner.hide();
            this.loadingModel = false;
          }, 700);
        },
        error: (e) => {
          setTimeout(() => {
            console.error(e)
            this.editMode = false;
            this.spinner.hide();
            this.loadingModel = false;
          }, 700);
        }
      });
  }

  loadEquipmentsProfile(): void {
    this.equipmentService.getAll()
      .subscribe({
        next: (data) => {
          this.equipmentProfiles = data;
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // Recupero da equipmentProfileSelected il Boil kettle e Boil Fermenter size e type malto quantità
    let batchSize: number = 0;
    let maltType: any;

    this.equipmentProfileSelected?.equipments?.forEach((equipment) => {
      if (equipment.name === TYPE_UNIQUE_NAME_ENUM.BOIL_KETTLE || equipment.name === TYPE_UNIQUE_NAME_ENUM.BOIL_FERMENTER) {
        batchSize = equipment?.quantity ?? 0;
      }
    });

    this.model?.ingredients?.forEach((ingredient) => {
      if (ingredient.type === INGREDIENTS_ENUM.MALT) {
        maltType = ingredient;
      }
    });

    if (batchSize && maltType) {
      let color = this.recipeService.getBeerColor(batchSize, maltType?.name, maltType?.quantity);

      let data = {
        title: this.model.title,
        color: color,
        description: this.model.description,
        equipmentProfileId: this.equipmentProfileSelected?._id,
        ingredients: this.model.ingredients?.map((x) => {
          return {
            name: x.name,
            quantity: x.quantity,
            type: x.type
          };
        })
      };

      if (this.editMode) {
        this.recipeService.update(this.model._id, data)
          .subscribe({
            next: (res) => {
              this.submitted = true;
              this.goBack();
              this.messageService.add({
                severity: 'success',
                summary: 'Ok! ',
                detail: 'Operazione avvenuta con successo'
              });

            },
            error: (e) => console.error(e)
          });
      } else {
        this.recipeService.create(data)
          .subscribe({
            next: (res) => {
              this.submitted = true;
              this.goBack();
              this.messageService.add({
                severity: 'success',
                summary: 'Ok! ',
                detail: 'Operazione avvenuta con successo'
              });
            },
            error: (e) => console.error(e)
          });
      }
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

  onChangeEquipmentProfileType() {
    if (this.model) {
      this.model.equipmentProfileId = this.equipmentProfileSelected?._id;
    }
  }

  getNameEquipments() {
    return this.equipmentProfileSelected?.equipments?.map(x => {
      if (x.quantity) {
        return x.name + " (" + (x.quantity) + " " + UNIT_OF_MEASUREMENT_ENUM.GALLONS + ")";
      } else {
        return x.name;
      }
    }) ?? [];
  }

  addIngredient(event: Ingredient) {
    console.log(event);

    if (!this.model.ingredients) {
      this.model.ingredients = [];
    }

    this.model.ingredients.push(event);
  }

  getColorRecipe() {
    let batchSize: number = 0;
    let maltType: any;

    this.equipmentProfileSelected?.equipments?.forEach((equipment) => {
      if (equipment.name === TYPE_UNIQUE_NAME_ENUM.BOIL_KETTLE || equipment.name === TYPE_UNIQUE_NAME_ENUM.BOIL_FERMENTER) {
        batchSize = equipment?.quantity ?? 0;
      }
    });

    this.model?.ingredients?.forEach((ingredient) => {
      if (ingredient.type === INGREDIENTS_ENUM.MALT) {
        maltType = ingredient;
      }
    });

    let color = "#f7a900";

    if (batchSize && maltType) {
      color = this.recipeService.getBeerColor(batchSize, maltType?.name, maltType?.quantity);
    }

    return color;
  }

  disabledSaveBtn() {
    if (!this.form.invalid && this.model.ingredients && this.model.ingredients.length > 0) {
      return false;
    }

    return true;
  }
}


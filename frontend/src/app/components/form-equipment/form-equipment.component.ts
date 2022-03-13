import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {Equipment, EquipmentInterface, EquipmentProfile} from 'src/app/models/equipment/equipment.model';
import {EquipmentService} from 'src/app/services/equipment/equipment.service';
import {TYPE_UNIQUE_NAME_ENUM} from "../../enum/equipmentUnits";

@Component({
  selector: 'app-form-equipment',
  templateUrl: './form-equipment.component.html',
  styleUrls: ['./form-equipment.component.css']
})
export class FormEquipmentComponent implements OnInit {
  @Input() id: string | null = null;
  public editMode: boolean = false;
  public form!: FormGroup;
  public loading: boolean = true;
  public displayModal: boolean = false;
  public clonedEquipments: { [s: string]: Equipment; } = {};

  get f() {
    return this.form.controls;
  }

  public model: EquipmentProfile;
  public newEquipment: Equipment;

  submitted = false;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private equipmentService: EquipmentService, private messageService: MessageService, private router: Router) {
    this.model = new EquipmentProfile();
    this.newEquipment = new Equipment();
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

    this.form = this._formBuilder.group({
      title: [null, [Validators.required]]
    });

    if (this.editMode) {
      this.getEquipment(this.route.snapshot.params["id"] || this.id);
    } else {
      this.stopLoading();
    }
  }

  stopLoading() {
    setTimeout(() => {
      this.spinner.hide();
    }, 700);
  }

  getEquipment(id: string): void {
    this.equipmentService.get(id)
      .subscribe({
        next: (data) => {
          this.editMode = true;

          setTimeout(() => {
            this.model = data;

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

  addEquipment() {
    this.displayModal = false;

    if (!this.model.equipments) {
      this.model.equipments = [];
    }

    this.model.equipments.push(this.newEquipment);

    this.newEquipment = new Equipment();
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid && !this.model.equipments) {
      return;
    }

    this.loading = true;

    let data = {
      title: this.model.title,
      equipments: this.model.equipments ? this.model.equipments.map(x => {
        return {
          name: x.name,
          quantity: x.quantity
        }
      }) : []
    };

    if (this.editMode) {
      this.equipmentService.update(this.model._id, data)
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
      this.equipmentService.create(data)
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

  deleteEquipment(): void {
    if (this.editMode) {
      this.equipmentService.delete(this.model._id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/equipments']);
          },
          error: (e) => console.error(e)
        });
    }
  }

  goBack() {
    this.router.navigate(['/equipments']);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  public setSelectedTypeEquipment(event: Equipment) {
    this.newEquipment.name = event.name;
    this.newEquipment.unit = event.unit;
  }

  public onRowEditInit(equipment: EquipmentInterface) {
    this.clonedEquipments[equipment.name] = {...equipment};
  }

  onRowEditSave(equipment: EquipmentInterface) {
    if (equipment && equipment?.quantity > 0) {
      if (this.editMode) {
        // TODO Upd Ingredient Backend
      } else {
        // TODO Modifico la lista sessione
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Si sono verificati degli errori'});
    }
  }

  onRowEditCancel(equipment: EquipmentInterface, index: number) {
    if (this.model.equipments) {
      this.model.equipments[index] = this.clonedEquipments[equipment.name];
      delete this.clonedEquipments[equipment.name];
    }
  }

  removeEquipment(equipment: any, index: number) {
    if (this.model.equipments) {
      this.model.equipments = this.model.equipments.filter(function (value, _index, arr) {
        return _index !== index;
      });

      delete this.clonedEquipments[equipment.name];
    }

    if (this.model.equipments && this.model.equipments.length === 0) {
      this.model.equipments = []
    }
  }

  getDisabledEquipment() {
    if (this.newEquipment && this.newEquipment.name) {
      return !!(this.newEquipment.unit && !this.newEquipment.quantity || (this.newEquipment.quantity && this.newEquipment?.quantity <= 0));
    } else {
      return true;
    }
  }

  getDisabled() {
    return this.form.invalid || !this.model.equipments || this.model.equipments?.findIndex((x) => x.name === TYPE_UNIQUE_NAME_ENUM.BOIL_KETTLE || x.name === TYPE_UNIQUE_NAME_ENUM.BOIL_FERMENTER) === -1;
  }
}

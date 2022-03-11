import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Equipment } from 'src/app/models/equipment/equipment.model';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

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

  get f() {
    return this.form.controls;
  }

  public model: Equipment;

  submitted = false;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private equipmentService: EquipmentService, private messageService: MessageService, private router: Router) {
    this.model = new Equipment();
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
    this.model.name = "";

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

  getEquipment(equipmentSelected: Equipment): void {
   console.log(equipmentSelected);
  }

  //aggiungere un singolo elemento creare un array non so come si salva backend
  addEquipment(){
    
  }
  //salvare la lista completa non so come si salva backend
  addEquipmentList(){

  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let data = { 
      title: this.model.name,
    };

    if (this.editMode) {
      this.equipmentService.update(this.model._id, data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            this.goBack();
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
          },
          error: (e) => console.error(e)
        });
    } else {
      this.equipmentService.create(data)
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

}

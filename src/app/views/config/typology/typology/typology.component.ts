import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { cilPencil } from '@coreui/icons';
import { TypologyService } from '../services/typology.service';
import { TypologyInterface } from '../interfaces/typology';

@Component({
  selector: 'app-typology',
  templateUrl: './typology.component.html',
  styleUrls: ['./typology.component.scss']
})
export class TypologyComponent implements OnInit {

  icons = { cilPencil };
  public page: number = 1
  public listTypology: TypologyInterface [] = []
  public isloading: boolean = false
  public customStylesValidated = false;
  public flatEdit: boolean = false
  public formTypology = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private _typologyService: TypologyService, private config: NgbPaginationConfig) {
    this.config.boundaryLinks = true
  }

  ngOnInit(): void {
    this.getAllTypology()
  }

  onSubmit(): void {
    this.formTypology.markAllAsTouched()
    if (this.formTypology.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formTypology.value
      this._typologyService.createTypology(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Creación Barrio',
            text: 'Registro barrio creado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formTypology.reset()
          this.getAllTypology()
        }
      })
      this.isloading = false
    }
  }

  updateTypology(): void {
    this.formTypology.markAllAsTouched()
    if (this.formTypology.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formTypology.value
      this._typologyService.updateTypology(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Actualización Empresa',
            text: 'Registro barrio actualizado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formTypology.reset()
          this.getAllTypology()
        }
      })
      this.isloading = false
    }
  }

  getAllTypology(): void {
    this.listTypology = []
    this._typologyService.getAllTypology().subscribe((response) => {
      this.listTypology = response.data
    })
  }


  editTypology(typology: TypologyInterface): void {
    this.flatEdit = true
    this.formTypology.patchValue(typology)
  }

  onReset(): void {
    this.flatEdit = false
    this.customStylesValidated = false;
    this.formTypology.reset()
  }

}

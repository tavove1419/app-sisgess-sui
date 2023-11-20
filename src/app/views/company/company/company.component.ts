import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { CompanyInterface } from '../interfaces/company.interface';
import { CompanyService } from '../services/company.service';
import { cilPencil } from '@coreui/icons';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [NgbPaginationConfig]
})

export class CompanyComponent implements OnInit {

  icons = { cilPencil };
  public page: number = 1
  public formCompany = this.fb.group({
    id: [''],
    nit: ['', [Validators.required]],
    dv: ['', [Validators.required]],
    name: ['', [Validators.required]],
    addres: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })
  public company: CompanyInterface = {
    id: '',
    nit: '',
    dv: '',
    name: '',
    addres: '',
    phone: '',
    email: ''
  }
  public isloading: boolean = false
  public customStylesValidated = false;
  public flatEdit: boolean = false
  public listCompany: CompanyInterface [] = []

  constructor(private fb: FormBuilder, private config: NgbPaginationConfig, private _serviceCompany: CompanyService) {
    this.config.boundaryLinks = true
  }

  ngOnInit(): void {
    this.getAllCompany()
  }

  onSubmit(): void {
    this.formCompany.markAllAsTouched()
    if (this.formCompany.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formCompany.value
      this._serviceCompany.createCompany(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Creación Empresa',
            text: 'Registro empresa creado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formCompany.reset()
          this.getAllCompany()
        }
      })
      this.isloading = false
    }
  }

  updateCompany(): void {
    this.formCompany.markAllAsTouched()
    if (this.formCompany.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formCompany.value
      this._serviceCompany.updateCompany(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Actualización Empresa',
            text: 'Registro empresa actualizado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formCompany.reset()
          this.getAllCompany()
        }
      })
      this.isloading = false
    }
  }

  editCompany(company: CompanyInterface): void {
    this.flatEdit = true
    this.formCompany.patchValue(company)
  }

  onReset(): void {
    this.flatEdit = false
    this.customStylesValidated = false;
    this.formCompany.reset()
  }

  getAllCompany(): void {
    this.listCompany = []
    this._serviceCompany.getAllCompany().subscribe((response) => {
      this.listCompany = response.data
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { cilPencil } from '@coreui/icons';
import { NeighborhoodService } from '../services/neighborhood.service';
import { NeighborhoodInterface } from '../interfaces/neighborhood.interface';
import { MunicipioInterface } from '../../config/municipio/interfaces/municipio.interface';
import { MunicipioService } from '../../config/municipio/services/municipio.service';



@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss']
})
export class NeighborhoodComponent implements OnInit {

  icons = { cilPencil };
  public filterNeighborhood = ''
  public page: number = 1
  public listMunicipio: MunicipioInterface[] = []
  public formNeighborhood = this.fb.group({
    id: [''],
    cod_mcp: ['', [Validators.required]],
    cod_bar: ['', [Validators.required]],
    name_bar: ['', [Validators.required]],
  })
  public neighborhood: NeighborhoodInterface = {
    id: '',
    cod_mcp: '',
    cod_bar: '',
    name_bar: ''
  }
  public isloading: boolean = false
  public customStylesValidated = false;
  public flatEdit: boolean = false
  public listNeighborhood: NeighborhoodInterface [] = []

  constructor(private fb: FormBuilder, private _neighborhoodService: NeighborhoodService, private config: NgbPaginationConfig, private readonly _serviceMunicipio: MunicipioService,) {
    this.config.boundaryLinks = true
  }

  ngOnInit(): void {
    this.getAllNeighborhood()
    this.allMunicipio()
  }

  onSubmit(): void {
    this.formNeighborhood.markAllAsTouched()
    if (this.formNeighborhood.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formNeighborhood.value
      this._neighborhoodService.createNeighborhood(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Creación Barrio',
            text: 'Registro barrio creado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formNeighborhood.reset()
          this.getAllNeighborhood()
        }
      })
      this.isloading = false
    }
  }

  allMunicipio(): void {
    this._serviceMunicipio.getAllMunicipio().subscribe((response) => {
      this.listMunicipio = response.data
    })
  }

  updateNeighborhood(): void {
    this.formNeighborhood.markAllAsTouched()
    if (this.formNeighborhood.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formNeighborhood.value
      this._neighborhoodService.updateNeighborhood(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Actualización Empresa',
            text: 'Registro barrio actualizado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formNeighborhood.reset()
          this.getAllNeighborhood()
        }
      })
      this.isloading = false
    }
  }

  editNeighborhood(neighborhood: NeighborhoodInterface): void {
    this.flatEdit = true
    this.formNeighborhood.patchValue(neighborhood)
  }

  onReset(): void {
    this.flatEdit = false
    this.customStylesValidated = false;
    this.formNeighborhood.reset()
  }

  getAllNeighborhood(): void {
    this.listNeighborhood = []
    this._neighborhoodService.getAllNeighborhood().subscribe((response) => {
      this.listNeighborhood = response.data
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MunicipioService } from '../../config/municipio/services/municipio.service';
import { MunicipioInterface } from './../../config/municipio/interfaces/municipio.interface';
import { NeighborhoodService } from '../../config/neighborhood/services/neighborhood.service';
import { NeighborhoodInterface } from '../../config/neighborhood/interfaces/neighborhood.interface';
import { PredialService } from '../../predial/services/predial.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { UserInterface } from '../../config/user/interfaces/user.interface';
import { UserService } from '../../config/user/services/user.service';
import { AsignationInterface, PredialSelectInterface } from './../interfaces';
import { AsignationService } from '../services/asignation.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-asignation',
  templateUrl: './asignation.component.html',
  styleUrls: ['./asignation.component.scss'],
  providers: [NgbPaginationConfig]
})
export class AsignationComponent implements OnInit{

  public formSearchPredials = this.fb.group({
    cod_mcp: [''],
    cod_bar: [''],
  })
  public formAsignation = this.fb.group({
    usuario: ['', [Validators.required]],
  })
  public page: number = 1
  public listMunicipio: MunicipioInterface[] = []
  public listBarrio: NeighborhoodInterface[] = []
  public listPredial: any[] = []
  public predialSelected: PredialSelectInterface[] = []
  public checked: boolean = false
  public listUser: UserInterface[] = []
  public dataAsignation: AsignationInterface[] = []
  public isloading: boolean = false

  constructor(
    private readonly fb: FormBuilder,
    private readonly _serviceMunicipio: MunicipioService,
    private readonly _serviceBarrio: NeighborhoodService,
    private readonly _servicePredial: PredialService,
    private readonly _serviceUser: UserService,
    private readonly _asignationService: AsignationService) { }

  ngOnInit(): void {
    this.allMunicipio()
  }

  searchPredials(): void {
    this.listPredial = []
    const data = this.formSearchPredials.value
    const info = {
      cod_mcp: data?.cod_mcp,
      cod_bar: data?.cod_bar
    }
    this._servicePredial.searchPredialsByBarrio(info).subscribe((response) => {
      this.listPredial = response
    })
  }

  allMunicipio(): void {
    this._serviceMunicipio.getAllMunicipio().subscribe((response) => {
      this.listMunicipio = response.data
    })
  }

  searchBarrio(e:any): void {
    this._serviceBarrio.getBarrioByMcp(e.value).subscribe((response) => {
      this.listBarrio = response.data
      this.getAllUser()
    })
  }

  addManzana(predial: PredialSelectInterface, check: any): void {
    if (check.target.checked) {
      this.predialSelected.push(predial)
    } else {
      this.predialSelected.splice(this.predialSelected.indexOf(predial), 1)
    }
    const dataAsign = new Set(this.predialSelected)
    this.predialSelected = [...dataAsign]
  }

  addAllManzana(check: any) {
    this.checked = check.target.checked
    this.listPredial.forEach((predial) => this.addManzana(predial, check))
  }

  onAsignation(): void {
    const {usuario} = this.formAsignation.value
    const idUser = Number(usuario)
    const user = this.listUser.find(user => Number(user.id) == idUser)
    this.dataAsignation = []
    if (!user || this.predialSelected.length === 0) {
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
      return
    }
    for (const info of this.predialSelected) {
      this.dataAsignation.push({
        cod_dpt: info.cod_dpt,
        cod_mcp: info.cod_mcp,
        cod_bar: info.barrio,
        name_barrio: info.name_bar,
        manzana: info.manzana,
        user_id: (user.id).toString(),
        user_name: user.name
      })
    }
    this.isloading = true
    this._asignationService.createAsignationArray(this.dataAsignation).subscribe((response) => {
      if (response.data) {
        Swal.fire({
          title: 'Asignación',
          text: 'Registro de asignación creada correctamente',
          icon: 'success'
        })
        this.isloading = false
        this.formAsignation.reset()
      }
    })
  }

  getAllUser(): void {
    this.listUser = []
    this._serviceUser.getAllUserEncuestador().subscribe((response) => {
      this.listUser = response.data
    })
  }
}

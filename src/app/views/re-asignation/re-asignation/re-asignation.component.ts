import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MunicipioInterface } from '../../config/municipio/interfaces/municipio.interface';
import { PredialService } from '../../predial/services/predial.service';
import { MunicipioService } from '../../config/municipio/services/municipio.service';
import { NeighborhoodService } from '../../config/neighborhood/services/neighborhood.service';
import { NeighborhoodInterface } from '../../config/neighborhood/interfaces/neighborhood.interface';
import { UserService } from '../../config/user/services/user.service';
import { UserInterface } from '../../config/user/interfaces/user.interface';
import { AsignationService } from '../../asignation/services/asignation.service';
import { AsignationInterface } from '../../asignation/interfaces';
import { cilBrush } from '@coreui/icons';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-re-asignation',
  templateUrl: './re-asignation.component.html',
  styleUrls: ['./re-asignation.component.scss']
})
export class ReAsignationComponent implements OnInit {

  icons = { cilBrush };
  public formSearchPredials = this.fb.group({
    cod_mcp: [''],
    cod_bar: [''],
  })
  public formReAsignation = this.fb.group({
    usuario: ['', [Validators.required]],
  })
  public listAsignation: AsignationInterface[] = []
  public listMunicipio: MunicipioInterface[] = []
  public listBarrio: NeighborhoodInterface[] = []
  public listUser: UserInterface[] = []
  public page: number = 1

  constructor ( private readonly fb: FormBuilder,
                private readonly _servicePredial: PredialService,
                private readonly _serviceMunicipio: MunicipioService,
                private readonly _serviceBarrio: NeighborhoodService,
                private readonly _serviceUser: UserService,
                private readonly _asignationService: AsignationService) {}

  ngOnInit(): void {
    this.allMunicipio()
  }

  searchAsignation(): void {
    this.listAsignation = []
    const data = this.formSearchPredials.value
    const info = {
      cod_mcp: data?.cod_mcp,
      cod_bar: data?.cod_bar
    }
    this._asignationService.searchAsignationByBarrio(info).subscribe((response) => {
      this.listAsignation = response
      console.log( this.listAsignation)
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

  getAllUser(): void {
    this.listUser = []
    this._serviceUser.getAllUserEncuestador().subscribe((response) => {
      this.listUser = response.data
    })
  }

  confirmAsignation(data: AsignationInterface): void {
    Swal.fire({
      title: 'Confirmación',
      text: "Esta seguro de realizar la re-asignación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, seguro!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onReAsignation(data)
      }
    })
  }

  onReAsignation(data: AsignationInterface): void {
    const {usuario} = this.formReAsignation.value
    const idUser = Number(usuario)
    const user = this.listUser.find(user => Number(user.id) == idUser)
    if (!user) {
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
      return
    }
    const update = data
    update.user_id = user.id
    update.user_name = `${user.name} ${user.lastname}`
    this._asignationService.updateAsignation(update).subscribe((response) => {
      if (response) {
        Swal.fire({
          title: 'Reasignación',
          text: `${response.message}`,
          icon: 'success'
        })
      }
    })
  }
}

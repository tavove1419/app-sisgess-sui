import { FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MunicipioService } from '../../config/municipio/services/municipio.service';
import { MunicipioInterface } from './../../config/municipio/interfaces/municipio.interface';
import { NeighborhoodService } from '../../config/neighborhood/services/neighborhood.service';
import { NeighborhoodInterface } from '../../config/neighborhood/interfaces/neighborhood.interface';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { Predial } from '../../predial/interfaces/predial.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { predialListActions, prediaInfoActions } from 'src/app/state/actions';
import { getPredialList, selectLoading } from './../../../state/selectors';
import { Router } from '@angular/router';
import { AsignationService } from '../../asignation/services/asignation.service';
import { AsignationInterface } from '../../asignation/interfaces';
import { cilPlaylistAdd } from '@coreui/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [NgbPaginationConfig]
})
export class RegisterComponent implements OnInit{

  icons = { cilPlaylistAdd };
  public formSearchPredials = this.fb.group({
    cod_mcp: [''],
    cod_bar: [''],
    manzana: ['']
  })
  public rolUser = sessionStorage.getItem('permission')
  public listMunicipio: MunicipioInterface[] = []
  public listBarrio: NeighborhoodInterface[] = []
  public listPredial: Predial[] = []
  public listManzana: AsignationInterface [] = []
  public customStylesValidated = false;
  public dataPredio: Predial = {
    barrio: '',
    cod_dpt: '',
    cod_mcp: '',
    cod_pred_homologado: '',
    direccion_cat: '',
    id: '',
    manzana: '',
    npn_pred_cat: '',
    predial_utilizado: '',
    predio: '',
    zona: ''
  }
  public page: number = 1

  //Store
  public loading$: Observable<boolean> = new Observable()
  public listPredials$: Observable<any> = this.store.select(getPredialList)

  constructor(
    private router: Router,
    private store: Store<any>,
    private readonly fb: FormBuilder,
    private readonly _serviceMunicipio: MunicipioService,
    private readonly _serviceBarrio: NeighborhoodService,
    private readonly _asignationService: AsignationService) { }

  ngOnInit(): void {
    this.allMunicipio()
  }

  searchPredials(): void {
    this.listPredial = []
    const data = this.formSearchPredials.value
    const info = {
      cod_mcp: data?.cod_mcp,
      cod_bar: data?.cod_bar,
      manzana: data?.manzana
    }
    this.store.dispatch(predialListActions(info))
    this.loading$ = this.store.select(selectLoading)
  }

  allMunicipio(): void {
    this._serviceMunicipio.getAllMunicipio().subscribe((response) => {
      this.listMunicipio = response.data
    })
  }

  searchBarrio(e:any): void {
    this._serviceBarrio.getBarrioByMcp(e.value).subscribe((response) => {
      this.listBarrio = response.data
    })
  }

  searchAsignation(e: any) {
    this.listManzana = []
    const idUser = sessionStorage.getItem('init')
    const data = this.formSearchPredials.value
    const info = {
      cod_mcp: data?.cod_mcp,
      cod_bar: data?.cod_bar,
      user_id: idUser
    }
    this._asignationService.searchAsignationByUser(info).subscribe((response) => {
      this.listManzana = response
    })
  }

  addRegister(predio: Predial): void {
    this.store.dispatch(prediaInfoActions(predio))
    this.dataPredio = predio
    this.router.navigateByUrl('register/unit')
	}

}

import { Component, OnInit } from '@angular/core';
import { Predial } from '../../predial/interfaces/predial.interface';
import { Store } from '@ngrx/store';
import { selectInfoPredial } from 'src/app/state/selectors';
import { Observable, take } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RegisterService } from '../services/register.service';
import {RegisterSuiInterface, TipologyInterface, UnitsInterface} from '../interfaces'
import { CompanyInterface } from '../../company/interfaces/company.interface';
import { LISTOPCIONACUEDUCTO, LISTOPCIONASEO, LISTOPCIONCANTARILLADO, LISTOPCIONENERGIA, LISTOPCIONGAS } from 'src/app/common';
import { v4 as uuidv4  } from 'uuid'
import { CompanyService } from '../../company/services/company.service';
import { cilBrush, cilPlaylistAdd } from '@coreui/icons';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit{

  icons = { cilBrush, cilPlaylistAdd };
  public formUnit = this.fb.group({
    id: [''],
    predial: ['', [Validators.required]],
    floor_number: ['', [Validators.required]],
    unit_number: ['', [Validators.required]]
  })

  public flatEdit: boolean = false
  public formRegisterSui = this.fb.group({
    codeBarrio: ['', [Validators.required]],
    predial: ['', [Validators.required]],
    address: ['', [Validators.required]],
    energyService: ['', [Validators.required]],
    energyMeter: [''],
    energyServiceProvider: ['', [Validators.required]],
    aqueductService: ['', [Validators.required]],
    aqueductMeter: [''],
    aqueductServiceProvider: ['', [Validators.required]],
    sewerageService: ['', [Validators.required]],
    sewerageMeter: [''],
    sewerageServiceProvider: ['', [Validators.required]],
    gasService: ['', [Validators.required]],
    gasMeter: [''],
    gasServiceProvider: ['', [Validators.required]],
    groomingService: ['', [Validators.required]],
    groomingMeter: [''],
    groomingServiceProvider: ['', [Validators.required]],
    codeTypology: ['', [Validators.required]],
    uuid: [''],
    number_piso: ['']
  })

  public customStylesValidated = false;
  public infoPredial$: Observable<any> = this.store.select(selectInfoPredial)
  public dataPredial: any
  public listUnit: UnitsInterface[] = []
  public listTipology: TipologyInterface[] = []
  public listRegisterSui: RegisterSuiInterface [] = []
  public listCompany: CompanyInterface[] = []
  public listOptionAcue = LISTOPCIONACUEDUCTO
  public listOptionAseo = LISTOPCIONASEO
  public listOptionAlcan = LISTOPCIONCANTARILLADO
  public listOptionEner = LISTOPCIONENERGIA
  public listOptionGas = LISTOPCIONGAS
  public page: number = 1
  public filterPredials = ''
  public isModal: boolean = false
  public flatOpcionAcue: boolean = true
  public flatOpcionAlcan: boolean = true
  public flatOpcionAseo: boolean = true
  public flatOpcionEner: boolean = true
  public flatOpcionGas: boolean = true
  public rol = sessionStorage.getItem('permission')

  constructor(private store: Store<any>,
    private fb: FormBuilder,
    private _registerService: RegisterService,
    private readonly _serviceCompany: CompanyService,) {
    this.previousDate()
  }

  ngOnInit(): void {
    this.allTypology()
    this.allCompany()
  }

  onSubmit(): void {
    this.formUnit.markAllAsTouched()
    if(this.formUnit.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      const data = this.formUnit.value
      delete data.id
      this._registerService.createRegisterUnits(data).subscribe((response) =>  {
        if (response.data) {
          Swal.fire({
            title: 'Registro Cantidad contadores',
            text: 'Registro Cantidades realizado correctamente',
            icon: 'success'
          })
          this.searchUnist(this.dataPredial.npn_pred_cat)
          this.onReset()
        }
      })
    }
  }

  searchUnist(predial: string): void {
    this._registerService.searchUnistByPredial(predial).subscribe((response) => {
      this.listUnit = response.data
    })
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.formUnit.get('floor_number')?.setValue('')
    this.formUnit.get('unit_number')?.setValue('')
  }

  previousDate(): void {
    this.infoPredial$.pipe(take(1)).subscribe((res) => {
      this.dataPredial = res
      this.formUnit.get('predial')?.setValue(res.npn_pred_cat)
      this.searchUnist(res.npn_pred_cat)
    })
  }

  saveInfoSui(): void {
    this.formRegisterSui.markAllAsTouched()
    if (this.formRegisterSui.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isModal = false
      const data = this.formRegisterSui.value
      this._registerService.createRegisterSui(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Registro SUI',
            text: 'Registro SUI realizado correctamente',
            icon: 'success'
          })
          this.formRegisterSui.reset()
        }
      })
    }
  }

  editUnit(unit: UnitsInterface): void {
    console.log(unit)
    this.flatEdit = true
    this.formUnit.get('id')?.setValue(unit.id.toString())
    this.formUnit.get('predial')?.setValue(unit.predial)
    this.formUnit.get('floor_number')?.setValue(unit.floor_number)
    this.formUnit.get('unit_number')?.setValue(unit.unit_number)
  }

  onUpdateUnit(): void {
    const info = this.formUnit.value
    this.flatEdit = false
    this._registerService.updateRegisterUnits(info).subscribe((response) => {
      if (response.data) {
        Swal.fire({
          title: 'Registro Cantidad contadores',
          text: `${response.message}`,
          icon: 'success'
        })
      }
      this.searchUnist(this.dataPredial.npn_pred_cat)
      this.onReset()
    })
  }

  allTypology(): void {
    this.listTipology = []
    this._registerService.getAllTipology().subscribe((response) => {
      this.listTipology = response.data
    })
  }

  allCompany(): void {
    this.listCompany = []
    this._serviceCompany.getAllCompany().subscribe((response) => {
      this.listCompany = response.data
    })
  }

  searchByPiso(units: UnitsInterface): void {
    this._registerService.searchPredialByPiso(units).subscribe((resp) => {
      if(resp) {
        if(resp.length < units.unit_number){
          this.confirmRegister(units)
        } else {
          Swal.fire({
            title: 'Registro SUI',
            text: 'Ya se registraron los contadores que corresponden a este predio y piso',
            icon: 'warning'
          })
        }
      }
    })
  }

  confirmRegister(unit: UnitsInterface): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Realizar el registro de SUI sobre este predio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.openModal(unit.floor_number)
      }
    })
  }

  openModal(piso: string): void {
    this.formRegisterSui.reset()
    this.isModal = true
    this.formRegisterSui.get('codeBarrio')?.setValue(this.dataPredial.barrio)
    this.formRegisterSui.get('predial')?.setValue(this.dataPredial.npn_pred_cat)
    this.formRegisterSui.get('address')?.setValue(this.dataPredial.direccion_cat)
    this.formRegisterSui.get('number_piso')?.setValue(piso)
    this.formRegisterSui.get('uuid')?.setValue(uuidv4())
	}

  closeModal(): void {
    this.isModal = false
    this.customStylesValidated = false;
	}

  handleLiveDemoChange(event: any): void {
    this.isModal = event;
    this.customStylesValidated = false;
  }

  changeOpcionAcue(e:any): void {
    e.value === 'Si' ? this.flatOpcionAcue = true : this.flatOpcionAcue = false
  }

  changeOpcionAlcan(e:any): void {
    e.value === 'Si' ? this.flatOpcionAlcan = true : this.flatOpcionAlcan = false
  }

  changeOpcionAseo(e:any): void {
    e.value === 'Si' ? this.flatOpcionAseo = true : this.flatOpcionAseo = false
  }

  changeOpcionEner(e:any): void {
    e.value === 'Si' ? this.flatOpcionEner = true : this.flatOpcionEner = false
  }

  changeOpcionGas(e:any): void {
    e.value === 'Si' ? this.flatOpcionGas = true : this.flatOpcionGas = false
  }
}

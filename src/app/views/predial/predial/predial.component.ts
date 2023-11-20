import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Predial } from '../interfaces/predial.interface';
import { PredialService } from '../services/predial.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver'

@Component({
  selector: 'app-predial',
  templateUrl: './predial.component.html',
  styleUrls: ['./predial.component.scss'],
  providers: [NgbPaginationConfig]
})
export class PredialComponent implements OnInit {

  public filterPredial = ''
  public dataExcel: string = ''
  public page: number = 1
  public predial: Predial = {
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
  public isModal: boolean = false
  public flatEdit: boolean = false
  public isloading: boolean = false
  public listPredial: Predial[] = []
  public tablePredial: Predial [] = []
  public dataPredial: any
  public upload: string = ''
  public customStylesValidated = false;
  public formPredial = this.fb.group({
    id: [''],
    cod_dpt: ['',[Validators.required]],
    cod_mcp: ['',[Validators.required]],
    predial_utilizado: ['',[Validators.required]],
    npn_pred_cat: ['',[Validators.required]],
    cod_pred_homologado: ['',[Validators.required]],
    direccion_cat: ['',[Validators.required]],
    barrio: ['',[Validators.required]],
    manzana: ['',[Validators.required]],
    predio: ['',[Validators.required]],
    zona: ['']
  })


  constructor(private fb: FormBuilder, private readonly _servicePredial: PredialService, private config: NgbPaginationConfig, private fileSaverService: FileSaverService) {
      this.config.boundaryLinks = true
  }

  ngOnInit(): void {
    this.allPredial()
  }

  onSubmit(): void {
    this.formPredial.markAllAsTouched()
    if (this.formPredial.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formPredial.value
      this._servicePredial.createPredial(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Creación Predial',
            text: 'Registro predial creado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formPredial.reset()
          this.allPredial()
        }
      })
      this.isloading = false
    }
  }

  updatePredial(): void {
    this.formPredial.markAllAsTouched()
    if (this.formPredial.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formPredial.value
      this._servicePredial.updatePredial(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Actualización Predial',
            text: 'Registro predial actualizado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formPredial.reset()
          this.allPredial()
        }
      })
      this.isloading = false
    }
  }

  allPredial(): void {
    this.listPredial  = []
    this._servicePredial.getAllPredial().subscribe((response) => {
      this.listPredial = response.data
    })
  }

  onFileChange(ev: any): void {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = () => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.dataExcel = dataString;
    }
    reader.readAsBinaryString(file);
  }

  tableDataExcel(): void {
    if(this.dataExcel !== undefined && this.dataExcel !== '' && this.dataExcel !== null) {
      const infoExcel = JSON.parse(this.dataExcel)
      for (const info of infoExcel.Hoja1) {
        this.predial = info
        this.predial.predial_utilizado = info.predial_utilizado.toString()
        this.tablePredial.push({...this.predial})
      }
      this._servicePredial.createListPredial(this.tablePredial).subscribe((response) => {
        const {cargados , existentes} = response.data
        if(existentes.length && cargados === 0) {
          this.convertExcel(existentes)
          Swal.fire({
            title: 'Carga Masiva Predial',
            text: 'Los predios anexados ya existen',
            icon: 'error'
          })
        } else if (existentes.length && cargados !== 0) {
          this.convertExcel(existentes)
          Swal.fire({
            title: 'Carga Masiva Predial',
            text: `Se cargaron en total ${cargados} predio(s), hay prediales ya existentes `,
            icon: 'warning'
          })
        } else {
          Swal.fire({
            title: 'Carga Masiva Predial',
            text: `Se guardaron en total ${cargados} predios correctamente`,
            icon: 'success'
          })
        }
        this.allPredial()
        this.dataExcel = ''
        this.upload = '';
      })
    } else {
      Swal.fire({
        title: 'Carga Masiva Predial',
        text: 'No hay archivo de excel cargado o el formato es incorrecto, sólo archivos XLS',
        icon: 'warning'
      })
    }

  }

  convertExcel(file: any): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const worksheet = XLSX.utils.json_to_sheet(file);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], {type: EXCEL_TYPE})
    this.fileSaverService.save(blobData, 'predios_existentes' + new Date().getTime() + EXCEL_EXTENSION)
  }

  onReset(): void {
    this.flatEdit = false
    this.customStylesValidated = false;
    this.formPredial.reset()
  }

  editPredial(predial: Predial): void {
    this.flatEdit = true
    this.formPredial.patchValue(predial)
  }

  openModal(predial: Predial): void {
    this.isModal = true
    this.dataPredial = predial
	}

  closeModal(): void {
    this.isModal = false
	}

  handleLiveDemoChange(event: any): void {
    this.isModal = event;
  }

}

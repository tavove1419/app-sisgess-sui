import { Component, OnInit } from '@angular/core';
import { SuiInformationService } from '../services/sui-information.service';
import { SuiInformationInterface } from '../interfaces/sui-information.interface';
import Swal from 'sweetalert2'
import { cilTrash, cilBook } from '@coreui/icons';

@Component({
  selector: 'app-sui-information',
  templateUrl: './sui-information.component.html',
  styleUrls: ['./sui-information.component.scss']
})
export class SuiInformationComponent implements OnInit{

  icons = { cilTrash, cilBook };
  public isloading: boolean = false
  public listInformation: SuiInformationInterface [] = []
  public page: number = 1
  public filterInfoSui = ''
  public dataSui: any
  public isModal: boolean = false

  constructor(private readonly _suiInformationService: SuiInformationService){}

  ngOnInit(): void {
    this.getAllInformationSui();
  }

  getAllInformationSui(): void {
    this.isloading = true
    this.listInformation = []
    this._suiInformationService.getAllSuiInformation().subscribe((response) => {
      this.listInformation = response.data
      this.isloading = false
    })
  }

  confirmDelete(information: SuiInformationInterface): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Eliminar el registro SUI!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteInformation(information)
      }
    })
  }

  onDeleteInformation(information: SuiInformationInterface): void {
    this._suiInformationService.deleteSuiInformation(information).subscribe((response) => {
      if(response.data) {
        Swal.fire({
          title: 'Información Sui',
          text: `${response.message}`,
          icon: 'success'
        })
      }
      this.getAllInformationSui()
    })
  }

  showInfo(info: any): void {
    this.isModal = true
    this.dataSui = info
  }

  closeModal(): void {
    this.isModal = false
	}

  handleLiveDemoChange(event: any): void {
    this.isModal = event;
  }
}

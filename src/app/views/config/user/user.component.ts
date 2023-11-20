import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';
import { UserInterface } from './interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public filterUser = ''
  public page: number = 1
  public flatEdit: boolean = false
  public isloading: boolean = false
  public customStylesValidated = false;
  public listUser: UserInterface[] = []
  public formUser = this.fb.group({
    id: [''],
    name: ['',[Validators.required]],
    lastname: ['',[Validators.required]],
    email: ['',[Validators.required]],
    password: [''],
    phone: ['',[Validators.required]],
    rol: ['',[Validators.required]],
    usuario: [''],
    status: [true],
  })

  constructor(private fb: FormBuilder, private config: NgbPaginationConfig, private readonly _serviceUser: UserService) {
    this.config.boundaryLinks = true
  }

  ngOnInit(): void {
    this.allUser()
  }

  onSubmit(): void {
    this.formUser.markAllAsTouched()
    if (this.formUser.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      const number = Math.floor(Math.random() * 4)
      this.isloading = true
      const data = this.formUser.value
      data.usuario = `${data.name?.toLocaleLowerCase().replace(/\s+/g, '')}${number}`
      data.password = data.usuario
      debugger
      this._serviceUser.createUser(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Creación Usuario',
            text: 'Registro usuario creado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formUser.reset()
          this.allUser()
        }
      })
      this.isloading = false
    }
  }

  updateUser(): void {
    this.formUser.markAllAsTouched()
    if (this.formUser.invalid) {
      this.customStylesValidated = true;
      Swal.fire({
        title: 'Información incompleta',
        text: 'Favor ingresar la informacion faltante',
        icon: 'warning'
      })
    } else {
      this.isloading = true
      const data = this.formUser.value
      data.password = data.usuario
      debugger
      this._serviceUser.updateUser(data).subscribe((response) => {
        if (response.data) {
          Swal.fire({
            title: 'Actualización Usuario',
            text: 'Usuario actualizado correctamente',
            icon: 'success'
          })
          this.isloading = false
          this.formUser.reset()
          this.allUser()
        }
      })
      this.isloading = false
    }
    this.flatEdit = false
  }

  editUser(user: UserInterface): void {
    this.flatEdit = true
    this.formUser.patchValue(user)
  }

  onReset(): void {
    this.flatEdit = false
    this.customStylesValidated = false;
    this.formUser.reset({
      status: true
    })
  }

  allUser(): void {
    try {
      this._serviceUser.getAllUser().subscribe((response) => {
        this.listUser = response.data
      })
    } catch (error) {
      Swal.fire({
        title: 'Lista Usuarios',
        text: 'Error al consultar los usuarios creados',
        icon: 'error'
      })
    }
  }
}



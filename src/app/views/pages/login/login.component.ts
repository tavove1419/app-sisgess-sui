import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formLogin = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['',[Validators.required]]
  })
  public latitude = ''
  public longitude = ''

  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService, private router: Router) {
    this.getLocation()
  }

  public getLocation(): void {
    this._authenticationService.getPosition().then(pos => {
      this.latitude = pos.lat
      this.longitude = pos.lng
      console.log('latitud', this.latitude)
      console.log('longitud', this.longitude)
    })
  }

  public login(): void {
    this.formLogin.markAllAsTouched()
    if (this.formLogin.invalid) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Validar formato de usuario (email)',
        icon: 'warning'
      })
    } else {
      const {email, password} = this.formLogin.value
      this._authenticationService.inLogin({email, password}).subscribe((data) => {
        if(data) {
          const {id, rol} = data.data.user
          sessionStorage.setItem('accessToken', data.data.accessToken)
          sessionStorage.setItem('init', id)
          sessionStorage.setItem('permission', rol)
          this.router.navigateByUrl('/dashboard')
        }
      })
    }
  }

}

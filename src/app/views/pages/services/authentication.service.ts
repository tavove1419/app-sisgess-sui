import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  inLogin(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}auth/login`, data)
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude})
      },
        err => {
          reject(err)
        })
    })
  }
}

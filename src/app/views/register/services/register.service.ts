import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllTipology(): Observable<any> {
    return this.http.get(`${this._urlServer}typology`)
  }

  getAllRegisterSui(): Observable<any> {
    return this.http.get(`${this._urlServer}sui-information`)
  }

  createRegisterSui(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}sui-information`, data)
  }

  createRegisterUnits(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}housing-units`, data)
  }

  updateRegisterUnits(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}housing-units/${data.id}`, data)
  }

  searchUnistByPredial(data: any): Observable<any> {
    const info = {
      predial: data
    }
    return this.http.post(`${this._urlServer}housing-units/search-unit-predial`, info)
  }

  searchPredialByPiso(data: any): Observable<any> {
    const info = {
      predial: data.predial,
      piso: data.floor_number
    }
    return this.http.post(`${this._urlServer}sui-information/predial-by-piso`, info)
  }
}

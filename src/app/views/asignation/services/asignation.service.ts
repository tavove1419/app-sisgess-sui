import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignationService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllAsignation(): Observable<any> {
    return this.http.get(`${this._urlServer}asignations`)
  }

  createAsignation(data: any): Observable<any> {
    console.log('dataos', data)
    return this.http.post(`${this._urlServer}asignations`, data)
  }

  createAsignationArray(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}asignations/create-asignation-array`, data)
  }

  updateAsignation(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}asignations/${data.id}`, data)
  }

  searchAsignationByUser(data: any): Observable<any> {
    const params = {
      cod_mcp: data.cod_mcp,
      cod_bar: data.cod_bar,
      user_id: data.user_id
    }
    return this.http.post(`${this._urlServer}asignations/asignation-by-user`, params)
  }

  getAsignationUser(data: any): Observable<any> {
    const params = {id: data}
    return this.http.post(`${this._urlServer}asignations/user-asignation`, params)
  }

  searchAsignationByBarrio(data: any): Observable<any> {
    const params = {
      cod_mcp: data.cod_mcp,
      cod_bar: data.cod_bar
    }
    return this.http.post(`${this._urlServer}asignations/asignation-by-barrio`, params)
  }


}

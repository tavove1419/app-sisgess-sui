import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PredialService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllPredial(): Observable<any> {
    return this.http.get(`${this._urlServer}predial`)
  }

  createPredial(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}predial`, data)
  }

  updatePredial(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}predial/${data.id}`, data)
  }

  searchPredialsByParams(data: any): Observable<any> {
    const params = {
      cod_mcp: data.cod_mcp,
      cod_bar: data.cod_bar,
      manzana: data.manzana
    }
    return this.http.post(`${this._urlServer}predial/predial-by-params`, params)
  }

  searchPredialsByBarrio(data: any): Observable<any> {
    const params = {
      cod_mcp: data.cod_mcp,
      cod_bar: data.cod_bar,
    }
    return this.http.post(`${this._urlServer}predial/predial-by-barrio`, params)
  }

  createListPredial(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}predial/create-list-predial`, data)
  }
}

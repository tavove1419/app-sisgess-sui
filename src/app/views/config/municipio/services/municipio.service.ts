import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllMunicipio(): Observable<any> {
    return this.http.get(`${this._urlServer}municipio`)
  }

  createMunicipio(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}municipio`, data)
  }

  updateMunicipio(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}municipio/${data.id}`, data)
  }
}

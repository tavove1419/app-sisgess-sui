import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllCompany(): Observable<any> {
    return this.http.get(`${this._urlServer}company`)
  }

  createCompany(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}company`, data)
  }

  updateCompany(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}company/${data.id}`, data)
  }
}

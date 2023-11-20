import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypologyService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllTypology(): Observable<any> {
    return this.http.get(`${this._urlServer}typology`)
  }

  createTypology(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}typology`, data)
  }

  updateTypology(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}typology/${data.id}`, data)
  }
}

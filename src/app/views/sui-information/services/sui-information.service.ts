import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuiInformationService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllSuiInformation(): Observable<any> {
    return this.http.get(`${this._urlServer}sui-information`)
  }

  deleteSuiInformation(data: any): Observable<any> {
    return this.http.delete(`${this._urlServer}sui-information/${data.id}`)
  }
}

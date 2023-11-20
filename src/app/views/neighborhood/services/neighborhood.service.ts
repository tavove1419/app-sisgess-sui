import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllNeighborhood(): Observable<any> {
    return this.http.get(`${this._urlServer}neighborhood`)
  }

  createNeighborhood(data: any): Observable<any> {
    return this.http.post(`${this._urlServer}neighborhood`, data)
  }

  updateNeighborhood(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}neighborhood/${data.id}`, data)
  }
}

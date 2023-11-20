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

  getBarrioByMcp(data: any): Observable<any> {
    return this.http.get(`${this._urlServer}neighborhood/filter-mcp/${data}`)
  }


}

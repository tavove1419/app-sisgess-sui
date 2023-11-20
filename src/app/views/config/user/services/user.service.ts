import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _urlServer = environment.sigessApi

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get(`${this._urlServer}user`)
  }

  createUser(data:any): Observable<any> {
    return this.http.post(`${this._urlServer}user`, data)
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this._urlServer}user/${data.id}`, data)
  }

  getAllUserEncuestador(): Observable<any> {
    const data = {
      rol: 'Encuestador'
    }
    return this.http.post(`${this._urlServer}user/user-encuestador`, data)
  }

}

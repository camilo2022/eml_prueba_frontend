import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../domain/models/User.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${environment.url}/Users`;

  constructor(private http: HttpClient) {}

  index(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/Index?page=${page}`);
  }

  store(user: User): Observable<any>  {
    return this.http.post(`${this.url}/Store`, user);
  }

  edit(id: number): Observable<any>  {
    return this.http.post(`${this.url}/Edit/${id}`, {});
  }

  update(user: User, id: number): Observable<any>  {
    return this.http.put(`${this.url}/Update/${id}`, user);
  }

  delete(user: User): Observable<any>  {
    return this.http.delete(`${this.url}/Delete`, user);
  }

  restore(user: User): Observable<any>  {
    return this.http.put(`${this.url}/Restore`, user);
  }
}

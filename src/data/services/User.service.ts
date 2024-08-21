import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../domain/models/User.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.url}/Users`;

  constructor(private httpClient: HttpClient) {}

  index(table: object, page: number): Observable<User[]> {
    return this.httpClient.post<User[]>(`${this.url}/Index?page=${page}`, table);
  }

  store(user: User): Observable<any>  {
    return this.httpClient.post(`${this.url}/Store`, user);
  }

  edit(id: number): Observable<any>  {
    return this.httpClient.post(`${this.url}/Edit/${id}`, null);
  }

  update(user: User, id: number): Observable<any>  {
    return this.httpClient.put(`${this.url}/Update/${id}`, user);
  }

  delete(user: User): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    };
    return this.httpClient.delete(`${this.url}/Delete`, httpOptions);
  }

  restore(user: User): Observable<any>  {
    return this.httpClient.put(`${this.url}/Restore`, user);
  }
}

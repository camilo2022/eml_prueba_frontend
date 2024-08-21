import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    public http: HttpClient,
  ) { }

  public get(url: string, params?: HttpParams) {
    return this.http.get(`${environment.url}${url}`)
  }
}

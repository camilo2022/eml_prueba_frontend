import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ParamCalcularTotales,
  ParamCalcularTotalesRequest,
  TypeCosteoProfesionalConsultoria,
} from '../../types/costeo-profesionales-consultoria';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CosteoProfesionalesConsultoriaService {
  constructor(private http: HttpClient) {}

  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable();

  get baseUrl() {
    return environment.url+ 'CosteoProfesionalesConsultoria';
  }



  postCalcularTotales(data: ParamCalcularTotales) {
    return this.http.post<any>(`${this.baseUrl}/CalcularTotales`, data);
  }

  updateCosteoProfesionalesConsultoria(data: TypeCosteoProfesionalConsultoria) {
    return this.http.put<any>(`${this.baseUrl}/UpdateCosto`, data);
  }

  deleteCosteoProfesionalesConsultoria(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/DeleteCosto/${id}`);
  }

  saveCosteoProfesionalesConsultoria(data: TypeCosteoProfesionalConsultoria) {
    return this.http.post<any>(`${this.baseUrl}/AddCosto`, data);
  }

  postCalcularTotalesRequest(data: ParamCalcularTotalesRequest) {
    return this.http.post<any>(`${this.baseUrl}/CalcularTotales`, data);
  }

  GetCostosTotalesByCronogramaId(id: number) {
    return this.http.get<ParamCalcularTotales>(
      `${this.baseUrl}/GetCostosTotalesByCronogramaId/${id}`
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTermSource.next(term);
  }

  getCosteoProfesionalesConsultoria(id: number) {
    return this.http.get<TypeCosteoProfesionalConsultoria[]>(
       `${this.baseUrl}/GetCostosByCronogramaId/${id}`
    );
  }



}

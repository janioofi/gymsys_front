import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Plano } from '../models/plano';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {
  url: string = `${ API_CONFIG.baseUrl }/planos`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Plano[]>{
    return this.http.get<Plano[]>(this.url);
  }

  create(plano: Plano){
    return this.http.post(this.url, plano);
  }

  findById(id: any): Observable<Plano>{
    return this.http.get<Plano>(`${this.url}/${id}`);
  }

  update(plano: Plano): Observable<Plano>{
    return this.http.put<Plano>(`${ this.url }/${plano.id_plano}`, plano);
  }

  delete(id: any): Observable<Plano>{
    return this.http.delete<Plano>(`${ this.url }/${id}`);
  }
}

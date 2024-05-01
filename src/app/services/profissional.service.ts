import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  url: string = `${ API_CONFIG.baseUrl }/profissionais`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Profissional[]>{
    return this.http.get<Profissional[]>(this.url);
  }

  create(profissional: Profissional){
    return this.http.post(this.url, profissional);
  }

  findById(id: any): Observable<Profissional>{
    return this.http.get<Profissional>(`${this.url}/${id}`);
  }

  update(profissional: Profissional): Observable<Profissional>{
    return this.http.put<Profissional>(`${ this.url }/${profissional.id_profissional}`, profissional);
  }

  delete(id: any): Observable<Profissional>{
    return this.http.delete<Profissional>(`${ this.url }/${id}`);
  }

}

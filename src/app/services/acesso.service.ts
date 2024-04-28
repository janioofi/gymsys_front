import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acesso } from '../models/acesso';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {
  url: string = `${ API_CONFIG.baseUrl }/acesso`;

  constructor(private http: HttpClient) { }

  treinandoAgora(): Observable<Acesso[]>{
    return this.http.get<Acesso[]>(`${this.url}/presentes`);
  }

  acessosDoDia(): Observable<Acesso[]>{
    return this.http.get<Acesso[]>(`${this.url}/diario`);
  }

  acessosPorPeriodo(data_inicio: string, data_final: string){
    let params = new HttpParams()
    .set('data_inicio', data_inicio)
    .set('data_final', data_final);
    return this.http.get<Acesso[]>(`${this.url}`, {params});
  }


}

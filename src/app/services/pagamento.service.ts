import { Pagamento } from './../models/pagamento';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  url: string = `${ API_CONFIG.baseUrl }/pagamentos`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Pagamento[]>{
    return this.http.get<Pagamento[]>(this.url);
  }

  create(pagamento: Pagamento){
    return this.http.post(this.url, pagamento);
  }

  findById(id: any): Observable<Pagamento>{
    return this.http.get<Pagamento>(`${this.url}/${id}`);
  }

  update(pagamento: Pagamento): Observable<Pagamento>{
    return this.http.put<Pagamento>(`${ this.url }/${pagamento.id_pagamento}`, pagamento);
  }

  acessosPorPeriodo(data_inicio: string, data_final: string){
    let params = new HttpParams()
    .set('data_inicio', data_inicio)
    .set('data_final', data_final);
    return this.http.get<Pagamento[]>(`${this.url}/periodo`, {params});
  }

}

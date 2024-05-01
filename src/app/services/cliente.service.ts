import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = `${ API_CONFIG.baseUrl }/clientes`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  create(cliente: Cliente){
    return this.http.post(this.url, cliente);
  }

  findById(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${ this.url }/${cliente.id_cliente}`, cliente);
  }

  delete(id: any): Observable<Cliente>{
    return this.http.delete<Cliente>(`${ this.url }/${id}`);
  }
}

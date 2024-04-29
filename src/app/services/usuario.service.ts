import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = `${ API_CONFIG.baseUrl }/usuarios`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  create(usuario: Usuario){
    return this.http.post(`${ API_CONFIG.baseUrl }/register`, usuario);
  }

}

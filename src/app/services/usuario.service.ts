import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = `${ API_CONFIG.baseUrl }/usuarios`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
}

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

}

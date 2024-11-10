import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estagiario {
  nome_completo: string;
  data_nascimento: string;
  email: string;
  senha: string;
  username: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EstagiarioService {
  private apiUrl = 'http://localhost:3000/estagiarios/registrar';

  constructor(private http: HttpClient) { }

  registrar(estagiario: Estagiario): Observable<any> {
    return this.http.post(`${this.apiUrl}`, estagiario);
  }
}
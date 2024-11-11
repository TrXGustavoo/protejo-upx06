import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Gestor {
  nome_completo: string;
  data_nascimento: string;
  email: string;
  senha: string;
  username: string;
  empresa: string;
}


@Injectable({
  providedIn: 'root'
})
export class GestorService {
  private apiUrl = 'http://localhost:3000/gestores/registrar';

  constructor(private http: HttpClient) { }

  registrar(gestor: Gestor): Observable<any> {
    return this.http.post(`${this.apiUrl}`, gestor);
  }
}

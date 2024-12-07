import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Gestor {
  id: number;
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
  private apiUrl = 'http://localhost:3000/gestores';

  constructor(private http: HttpClient) { }

  registrar(gestor: Gestor): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, gestor);
  }

  listarGestores(): Observable<Gestor[]> {
    const url = `${this.apiUrl}/listar`; 
    return this.http.get<Gestor[]>(url);
  }

  excluirGestor(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url);
  }

  buscarGestorPorId(id: number): Observable<Gestor> {
    const url = `${this.apiUrl}/buscar/${id}`; 
    return this.http.get<Gestor>(url);
  }

  editarGestor(gestor: Gestor): Observable<any> {
    const url = `${this.apiUrl}/editar/${gestor.id}`; 
    return this.http.put(url, gestor);
  }

}

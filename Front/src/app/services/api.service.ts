import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estagiario {
  id: number;
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
  private registrarUrl = 'http://localhost:3000/estagiarios/registrar';
  private listarUrl = 'http://localhost:3000/estagiarios/listar';
  private deletarUrl = 'http://localhost:3000/estagiarios/:id';

  constructor(private http: HttpClient) { }

  registrar(estagiario: Estagiario): Observable<any> {
    return this.http.post(`${this.registrarUrl}`, estagiario);
  }
  listar_estagiario(): Observable<Estagiario[]> {
    return this.http.get<Estagiario[]>(this.listarUrl);
  }
  excluirEstagiario(id: number): Observable<any> {
    const url = `${this.deletarUrl.replace(':id', id.toString())}`; 
    console.log("URL de exclusão:", url);  // Adicione este console.log para verificar a URL
    return this.http.delete(url);
  }
  
}
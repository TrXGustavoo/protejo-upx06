import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estagiario {
  id: number;
  nome_completo: string;
  data_nascimento: string;
  email: string;
  senha: string;
  curso: string;
  ativo: boolean;
  nome_empresa: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class EstagiarioService {
  private registrarUrl = 'http://localhost:3000/estagiarios/registrar';
  private listarUrl = 'http://localhost:3000/estagiarios/listar';
  private deletarUrl = 'http://localhost:3000/estagiarios/:id';
  private buscaUrl = 'http://localhost:3000/estagiarios/buscar';
  private editarUrl = 'http://localhost:3000/estagiarios/editar';
  private apiUrl = 'http://localhost:3000/estagiarios'; 
  private vincularUrl = 'http://localhost:3000/empresas/estagiarios';

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

  editarEstagiario(estagiario: Estagiario): Observable<any> {
    const url = `${this.editarUrl}/${estagiario.id}`; // Ajuste a interpolação da URL
    return this.http.put(url, estagiario);
  }

  buscarEstagiarioPorId(id: number): Observable<Estagiario> {
    const url = `${this.buscaUrl}/${id}`;
    return this.http.get<Estagiario>(url);
  }

  desvincularEstagiario(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${this.apiUrl}/${id}/desvincular`; // Removido o '/desvincular'
    return this.http.delete(url, { headers }); // Método DELETE
  }
  

  vincularEstagiario(estagiarioId: number, gestorId: number, empresaId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log('Estagiario ID:', estagiarioId);
    console.log('gestor ID:', gestorId);
    console.log('empresa ID:', empresaId);

    const url = `${this.vincularUrl}/${estagiarioId}/vincular`;
    const body = { gestorId, empresaId };

    return this.http.put(url, body, { headers });
  }

}
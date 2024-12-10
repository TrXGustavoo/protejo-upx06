import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Empresa {
  id: number;
  nome: string;
  cnpj: number;
  endereco: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/empresas';
  private authUrl = 'http://localhost:3000/empresas/login';

  constructor(private http: HttpClient) { }

  criarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post(`${this.apiUrl}`, empresa);
  }

  listarEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  excluirEmpresa(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  buscarEmpresaPorId(id: number): Observable<Empresa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // const url = `<span class="math-inline">\{this\.apiUrl\}/</span>{id}`;
    const url = `${this.apiUrl}/buscar/${id}`;
    return this.http.get<Empresa>(url, { headers });
  }

  editarEmpresa(empresa: Empresa): Observable<any> {
    const url = `${this.apiUrl}/${empresa.id}`;
    return this.http.put(url, empresa);
  }

  loginEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post(this.authUrl, empresa).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipoUsuario', response.tipoUsuario);
        localStorage.setItem('empresaId', response.empresaId);
      })
    );
  }

  buscarGestoresDaEmpresa(empresaId: number): Observable<any[]> {
    const token = localStorage.getItem('token'); // Recupere o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicione o token ao header
    });

    const url = `${this.apiUrl}/${Number(empresaId)}/gestores`;
    return this.http.get<any[]>(url, { headers }); // Envie o header na requisição
  }

  buscarEstagiariosDaEmpresa(empresaId: number): Observable<any[]> {
    const token = localStorage.getItem('token'); // Recupere o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicione o token ao header
    });

    const url = `${this.apiUrl}/${Number(empresaId)}/estagiarios`;
    return this.http.get<any[]>(url, { headers }); // Envie o header na requisição
  }

  private empresasCache = new Map<number, string>();

}
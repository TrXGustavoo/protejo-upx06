import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login'; // URL da API para login de estagiários

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipoUsuario', response.tipoUsuario);
        
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario'); 
    // Redirecionar para a página de login (opcional)
    // this.router.navigate(['/login']); 
  }
}
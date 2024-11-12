import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importe o Router
import { AuthService } from '../../../services/auth.service'; // Importe o AuthService
import { Usuario } from '../../../services/auth.service'; // Importe a interface Usuario

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrigido para styleUrls
})
export class LoginComponent {
  usuario: Usuario = { email: '', senha: '' }; // Declarando a variável usuario

  constructor(
    private authService: AuthService, 
    private router: Router // Injetando o Router
  ) { }

  login() {
    console.log('Fazendo login...', this.usuario);
    this.authService.login(this.usuario).subscribe(
      (response) => {
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro no login:', error);
        // Exibir mensagem de erro para o usuário
      }
    );
  }
}
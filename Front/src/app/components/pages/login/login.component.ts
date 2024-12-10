import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = { email: '', senha: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // Armazenar o token JWT e o tipo de usuário
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipoUsuario', response.tipoUsuario);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('empresaId', response.empresaId);

        // Redirecionar para a página principal
        if (response.tipoUsuario === 'estagiario') {
          this.router.navigate(['/perfil-aprendiz', response.userId]);
        } else if (response.tipoUsuario === 'gestor') {
          this.router.navigate(['/perfil-gestor']);
        } else if (response.tipoUsuario === 'empresa') {
          this.router.navigate(['/empresas']); // Redirecionar para a página de empresas
        } else {
          // Redirecionar para uma página padrão, caso o tipo de usuário não seja reconhecido
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);
        // Exibir mensagem de erro para o usuário
      }
    });
  }
}
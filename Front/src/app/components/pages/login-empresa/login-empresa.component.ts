import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService, Empresa } from '../../../services/empresa.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent {
  empresa: Empresa = {  // Utilize a interface Empresa para tipar a variável
    id: 0,             // Inicialize as propriedades obrigatórias
    nome: '',
    cnpj: 0,
    endereco: '',
    senha: ''
  };

  constructor(private empresaService: EmpresaService, private router: Router) { }

  login() {
    this.empresaService.loginEmpresa(this.empresa).subscribe({
      next: (response) => {
        console.log('Login da empresa bem-sucedido!', response);
        // Armazenar o token JWT e o tipo de usuário
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipoUsuario', response.tipoUsuario);
        localStorage.setItem('empresaId', response.empresaId);
        console.log('Token:', response.empresaId);

   
        // Redirecionar para a página da empresa
        console.log('Empresa ID:', response.tipoUsuario);
        this.router.navigate(['/perfil-empresa', response.empresaId]);

      },
      error: (error) => {
        console.error('Erro no login da empresa:', error);
        // Exibir mensagem de erro para o usuário
      }
    });
  }
}
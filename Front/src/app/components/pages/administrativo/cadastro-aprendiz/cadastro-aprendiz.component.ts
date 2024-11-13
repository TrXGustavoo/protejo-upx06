import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estagiario, EstagiarioService } from '../../../../services/api.service';

@Component({
  selector: 'app-cadastro-aprendiz',
  templateUrl: './cadastro-aprendiz.component.html',
  styleUrl: './cadastro-aprendiz.component.css'
})
export class CadastroAprendizComponent {
  // constructor(private router: Router) { }

  estagiario: Estagiario = {
    id: 0,
    nome_completo: '',
    data_nascimento: '',
    email: '',
    senha: '',
    username: '',
    ativo: true
  };

  constructor(
    private router: Router, 
    private estagiarioService: EstagiarioService
  ) { }


  registrar() {
    this.estagiarioService.registrar(this.estagiario)
      .subscribe(
        response => {
          console.log('Estagiario registrado com sucesso!', response);
          
        },
        error => {
          console.error('Erro ao registrar Estagiario:', error);
          
        }
      );
  }
  cancelar() {
    this.router.navigate(['/aprendiz']);
    return 
  }
}

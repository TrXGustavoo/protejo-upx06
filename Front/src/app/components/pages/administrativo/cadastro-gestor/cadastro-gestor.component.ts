import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gestor, GestorService } from '../../../../services/gestor.service';

@Component({
  selector: 'app-cadastro-gestor',
  templateUrl: './cadastro-gestor.component.html',
  styleUrl: './cadastro-gestor.component.css'
})
export class CadastroGestorComponent {

  gestor: Gestor = {
    nome_completo: '',
    data_nascimento: '',
    email: '',
    senha: '',
    username: '',
    empresa: '',
  };

  constructor(private gestorService: GestorService, private router: Router) { } 

  registrar() {
    this.gestorService.registrar(this.gestor)
      .subscribe(
        response => {
          console.log('Gestor registrado com sucesso!', response);
          
        },
        error => {
          console.error('Erro ao registrar Estagiario:', error);
          
        }
      );
  }

   cancelar() {
     this.router.navigate(['/gestores']);
   }
}

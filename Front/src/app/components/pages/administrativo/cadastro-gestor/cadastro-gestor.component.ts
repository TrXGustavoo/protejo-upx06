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
    id: 0,
    nome_completo: '',
    data_nascimento: '',
    email: '',
    senha: '',
    setor: '',
    empresa_id: 0,
    nome_empresa: ''
  };

  constructor(private gestorService: GestorService, private router: Router) { } 

  registrar() {
    this.gestorService.registrar(this.gestor)
      .subscribe(
        response => {
          console.log('Gestor registrado com sucesso!', response);
          this.router.navigate(['/gestores']);
        },
        error => {
          console.error('Erro ao registrar Gestor:', error);
          
        }
      );
  }

   cancelar() {
     this.router.navigate(['/gestores']);
   }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-gestor',
  templateUrl: './cadastro-gestor.component.html',
  styleUrl: './cadastro-gestor.component.css'
})
export class CadastroGestorComponent {
  constructor(private router: Router) { }

  cancelar() {
    this.router.navigate(['/gestores']);
  }
}

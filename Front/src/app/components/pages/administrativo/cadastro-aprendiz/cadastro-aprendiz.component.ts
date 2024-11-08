import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-aprendiz',
  templateUrl: './cadastro-aprendiz.component.html',
  styleUrl: './cadastro-aprendiz.component.css'
})
export class CadastroAprendizComponent {
  constructor(private router: Router) { }

  cancelar() {
    this.router.navigate(['/aprendiz']);
  }
}

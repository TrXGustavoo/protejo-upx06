import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  tipoUsuario: string | null = null; 
  empresaId: number | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem('tipoUsuario');
    this.empresaId = Number(localStorage.getItem('empresaId'));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('empresaId');
    localStorage.removeItem('usuarioId'); // Remover o ID do usuário, se existir
    this.router.navigate(['/login']); // Redirecionar para a página de login
  }
}
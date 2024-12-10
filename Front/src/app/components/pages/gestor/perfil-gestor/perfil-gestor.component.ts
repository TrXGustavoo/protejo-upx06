import { Component, OnInit } from '@angular/core';
import { GestorService, Gestor } from '../../../../services/gestor.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-perfil-gestor',
  templateUrl: './perfil-gestor.component.html',
  styleUrls: ['./perfil-gestor.component.css']
})
export class PerfilGestorComponent implements OnInit {
  estagiarios: any[] = [];
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

  tipoUsuario: string | null = null;
  gestorId: number | null = null;

  constructor(
    private gestorService: GestorService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.buscarGestor();
    this.buscarEstagiarios();
    this.tipoUsuario = localStorage.getItem('tipoUsuario');

  }

  buscarEstagiarios() {
    this.gestorService.getEstagiariosDoGestor().subscribe(
      (estagiarios) => {
        this.estagiarios = estagiarios;
      },
      (error) => {
        console.error('Erro ao buscar estagiários:', error);
      }
    );
  }

  buscarGestor() {
    const gestorId = Number(localStorage.getItem('userId'));
    if (gestorId) {
      this.gestorService.buscarGestorPorId(gestorId).subscribe(
        (gestor) => {
          this.gestor = gestor;
        },
        (error) => {
          console.error('Erro ao buscar gestor:', error);
        }
      );
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
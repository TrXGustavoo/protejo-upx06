import { Component, OnInit } from '@angular/core';
import { Gestor, GestorService } from '../../../../services/gestor.service'; 
import { Router } from '@angular/router';

interface Filter {
  nome_completo: string;
  username: string;
  email: string;
  empresa: string; 
}

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {
  gestores: Gestor[] = [];
  filteredGestores: Gestor[] = [];
  filter: Filter = {
    nome_completo: '',
    username: '',
    email: '',
    empresa: '', 
  };

  constructor(private router: Router, private gestorService: GestorService) { } 

  ngOnInit() {
    this.buscarGestores();
  }

  buscarGestores() {
    this.gestorService.listarGestores().subscribe(
      (gestores) => {
        this.gestores = gestores;
        this.filteredGestores = gestores;
      },
      (error) => {
        console.error('Erro ao buscar gestores:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredGestores = this.gestores.filter(gestor => {
      return (
        (this.filter.nome_completo ? gestor.nome_completo.includes(this.filter.nome_completo) : true) &&
        (this.filter.username ? gestor.username.includes(this.filter.username) : true) &&
        (this.filter.email ? gestor.email.includes(this.filter.email) : true) &&
        (this.filter.empresa ? gestor.empresa.includes(this.filter.empresa) : true) 
      );
    });
  }

  excluirGestor(gestor: Gestor) {
    if (confirm(`Tem certeza que deseja excluir o gestor ${gestor.nome_completo}?`)) {
      this.gestorService.excluirGestor(gestor.id)
        .subscribe(
          () => {
            this.gestores = this.gestores.filter(g => g.id !== gestor.id);
            this.applyFilters(); 
            console.log('Gestor excluído com sucesso!');
          },
          (error) => {
            console.error('Erro ao excluir gestor:', error);
          }
        );
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastro-gestor']); 
  }
}

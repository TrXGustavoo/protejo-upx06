import { Component, OnInit } from '@angular/core';
import { Gestor, GestorService } from '../../../../services/gestor.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../../services/empresa.service'; // Importe o EmpresaService


interface Filter {
  nome_completo: string;
  setor: string;
  email: string;
  empresa_id: number;
  nome_empresa: string;
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
    setor: '',
    email: '',
    empresa_id: 0,
    nome_empresa: ''
  };

  constructor(
    private router: Router,
    private gestorService: GestorService,
  ) { }

  ngOnInit() {
    this.buscarGestores();
  }

  buscarGestores() {
    this.gestorService.listarGestores().subscribe(
      (gestores) => {
        this.gestores = gestores;
        this.filteredGestores = gestores;
        console.log('Gestores:', gestores);
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
        (this.filter.setor ? gestor.setor.includes(this.filter.setor) : true) &&
        (this.filter.email ? gestor.email.includes(this.filter.email) : true) &&
        (this.filter.nome_empresa ? gestor.nome_empresa.includes(this.filter.nome_empresa) : true) 
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

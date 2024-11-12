import { Component, OnInit } from '@angular/core';
import { Estagiario, EstagiarioService } from '../../../../services/api.service';
import { Router } from '@angular/router';

interface Filter {
  nome_completo: string;
  username: string;
  email: string;
  ativo?: boolean; // Ativo agora é opcional, para filtrar por todos, ativos ou inativos
}

@Component({
  selector: 'app-aprendiz',
  templateUrl: './aprendiz.component.html',
  styleUrls: ['./aprendiz.component.css']
})
export class AprendizComponent implements OnInit {
  estagiarios: Estagiario[] = [];
  filteredEstagiarios: Estagiario[] = []; // Corrigido o nome da variável
  filter: Filter = { // Inicializa o filtro com valores vazios
    nome_completo: '',
    username: '',
    email: '',
    ativo: undefined // Inicialmente, não filtra por ativo/inativo
  };

  constructor(private router: Router, private estagiarioService: EstagiarioService) { }

  ngOnInit() {
    this.buscarEstagiario();
  }

  buscarEstagiario() {
    this.estagiarioService.listar_estagiario().subscribe(
      (estagiarios) => {
        this.estagiarios = estagiarios;
        this.filteredEstagiarios = estagiarios; // Inicializa a lista filtrada com todos os estagiários
      },
      (error) => {
        console.error('Erro ao buscar estagiários:', error);
        // Tratar o erro, ex: exibir uma mensagem para o usuário
      }
    );
  }

  //filtragem
  applyFilters(): void {
    this.filteredEstagiarios = this.estagiarios.filter(estagiario => {
      return (
        (this.filter.nome_completo ? estagiario.nome_completo.includes(this.filter.nome_completo) : true) &&
        (this.filter.username ? estagiario.username.includes(this.filter.username) : true) &&
        (this.filter.email ? estagiario.email.includes(this.filter.email) : true) &&
        (this.filter.ativo === undefined ? true : estagiario.ativo === this.filter.ativo) // Filtra por ativo/inativo se definido
      );
    });
  }

  excluirEstagiario(estagiario: Estagiario) {
    if (confirm(`Tem certeza que deseja excluir o estagiário ${estagiario.nome_completo}?`)) {
      this.estagiarioService.excluirEstagiario(estagiario.id)
        .subscribe(
          () => {
            // Remover o estagiário da lista
            this.estagiarios = this.estagiarios.filter(e => e.id !== estagiario.id);
            this.applyFilters(); // Reaplicar os filtros para atualizar a lista filtrada
            console.log('Estagiário excluído com sucesso!');
          },
          (error) => {
            console.error('Erro ao excluir estagiário:', error);
            // Exibir uma mensagem de erro para o usuário
          }
        );
    }
  }
  cadastrar() {
    this.router.navigate(['/cadastro-aprendiz']);
  }
}

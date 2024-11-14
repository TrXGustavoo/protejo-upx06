import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  // Dados de atividades para demonstração fictício
  atividades = [
    { id: 1, envio: true, nome_atividade: 'Relatório semanal', gestor: 'Carlos Lima', feedback: 'Bom progresso!' },
    { id: 2, envio: false, nome_atividade: 'Treinamento interno', gestor: 'Carlos Lima', feedback: '' },
    { id: 3, envio: true, nome_atividade: 'Desenvolvimento de aplicação', gestor: 'Pedro Martins', feedback: 'Ótima entrega!' }
  ];

  // Filtros para atividades
  filter = {
    envio: undefined,
    nome_atividade: '',   
    gestor: '',
    feedback: ''
  };

  // Lista de atividades filtradas
  filteredAtividades = [...this.atividades];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.applyFilters(); // Aplica os filtros ao inicializar
  }

  // Função para aplicar os filtros
  applyFilters() {
    this.filteredAtividades = this.atividades.filter(atividade => {
      return (
        (this.filter.envio === undefined || atividade.envio === this.filter.envio) &&
        (this.filter.nome_atividade === '' || atividade.nome_atividade.toLowerCase().includes(this.filter.nome_atividade.toLowerCase())) &&
        (this.filter.gestor === '' || atividade.gestor.toLowerCase().includes(this.filter.gestor.toLowerCase())) &&
        (this.filter.feedback === '' || atividade.feedback.toLowerCase().includes(this.filter.feedback.toLowerCase()))
      );
    });
  }

  cadastroAtividade() {
    this.router.navigate(['/cadastro-atividade']);
  }

  // Função de exclusão de atividade (apenas exibe um alerta para exemplo)
  excluirAtividade(atividade: any) {
    // Exibe o alerta
    alert('Excluir: ' + atividade.nome_atividade);

    // Remove a atividade da lista original
    this.atividades = this.atividades.filter(item => item.id !== atividade.id);

    // Reaplica os filtros para atualizar a lista na tela
    this.applyFilters();
  }
}

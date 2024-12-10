import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { EstagiarioService } from '../../../../services/api.service'; // Importe o EstagiarioService



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

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

  estagiario: any; // Variável para armazenar os dados do estagiário

  constructor(
    private router: Router, 
    private authService: AuthService,
    private route: ActivatedRoute, // Injetar o ActivatedRoute
    private estagiarioService: EstagiarioService // Injetar o EstagiarioService
  ) { }

  ngOnInit(): void {
    this.buscarEstagiario(); // Buscar os dados do estagiário ao iniciar o componente
    this.applyFilters();
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

  buscarEstagiario() {
    const id = this.route.snapshot.paramMap.get('id'); // Obter o ID do estagiário da rota
    if (id) {
      this.estagiarioService.buscarEstagiarioPorId(+id).subscribe({ // Buscar os dados do estagiário na API
        next: (estagiario) => {
          this.estagiario = estagiario;
        },
        error: (error) => {
          console.error('Erro ao buscar estagiário:', error);
          // Tratar o erro, ex: exibir uma mensagem para o usuário
        }
      });
    }
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

  

  onLogout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { Estagiario, EstagiarioService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../services/SharedData.service';

interface Filter {
  nome_completo: string;
  curso: string;
  email: string;
  data_nascimento: string;
  ativo?: boolean;
  empresa: string;
}

@Component({
  selector: 'app-aprendiz',
  templateUrl: './aprendiz.component.html',
  styleUrls: ['./aprendiz.component.css']
})
export class AprendizComponent implements OnInit {
  estagiarios: Estagiario[] = [];
  filteredEstagiarios: Estagiario[] = [];
  filter: Filter = {
    nome_completo: '',
    curso: '',
    email: '',
    data_nascimento: '',
    ativo: undefined,
    empresa: ''
  };

  tipoUsuario: string | null = localStorage.getItem('tipoUsuario');
  usuarioId: number | null = Number(localStorage.getItem('usuarioId'));

  constructor(
    private router: Router,
    private estagiarioService: EstagiarioService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.buscarEstagiario();

    // Escutar a notificação de atualização do SharedDataService
  }

  buscarEstagiario() {
    this.estagiarioService.listar_estagiario().subscribe({
      next: (estagiarios) => {
        this.estagiarios = estagiarios;
        this.filteredEstagiarios = estagiarios;
      },
      error: (error) => {
        console.error('Erro ao buscar estagiários:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredEstagiarios = this.estagiarios.filter(estagiario => {
      const dataNascimento = estagiario.data_nascimento ? new Date(estagiario.data_nascimento).toLocaleDateString() : '';
      const filtroDataNascimento = this.filter.data_nascimento ? new Date(this.filter.data_nascimento).toLocaleDateString() : '';

      return (
        (this.filter.nome_completo ? estagiario.nome_completo.toLowerCase().includes(this.filter.nome_completo.toLowerCase()) : true) &&
        (this.filter.curso ? estagiario.curso.toLowerCase().includes(this.filter.curso.toLowerCase()) : true) &&
        (this.filter.email ? estagiario.email.toLowerCase().includes(this.filter.email.toLowerCase()) : true) &&
        (this.filter.data_nascimento === '' || dataNascimento === filtroDataNascimento) &&
        (this.filter.ativo === undefined || estagiario.ativo === this.filter.ativo) &&
        (this.filter.empresa === '' || (estagiario.nome_empresa && estagiario.nome_empresa.toLowerCase().includes(this.filter.empresa.toLowerCase())))
      );
    });
  }

  desvincularEstagiario(estagiario: Estagiario) {
    if (confirm(`Tem certeza que deseja desvincular o estagiário ${estagiario.nome_completo}?`)) {
      this.estagiarioService.desvincularEstagiario(estagiario.id)
        .subscribe({
          next: () => {

            this.estagiarioService.buscarEstagiarioPorId(estagiario.id).subscribe({
              next: (estagiarioAtualizado) => {



                const index = this.estagiarios.findIndex(e => e.id === estagiario.id);
                if (index !== -1) {
                  this.estagiarios[index] = estagiarioAtualizado;
  
                  this.applyFilters();
                }
              },
              error: (error) => {
                console.error('Erro ao buscar estagiário atualizado:', error);

              }
            });

            console.log('Estagiário desvinculado com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao desvincular estagiário:', error);

          }
        });
    }
  }

  vincularEstagiario(estagiario: Estagiario) {
    const gestorId = Number(localStorage.getItem('userId'));
    const empresaId = Number(localStorage.getItem('empresaId'));

    if (confirm(`Tem certeza que deseja vincular o estagiário ${estagiario.nome_completo}?`)) {
      this.estagiarioService.vincularEstagiario(estagiario.id, gestorId, empresaId)
        .subscribe({
          next: () => {
            const index = this.estagiarios.findIndex(e => e.id === estagiario.id);
            if (index !== -1) {
              
              this.applyFilters(); 
            }

            console.log('Estagiário vinculado com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao vincular estagiário:', error);
          }
        });
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastro-aprendiz']);
  }
}
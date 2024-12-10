import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estagiario, EstagiarioService } from '../../../../services/api.service';

@Component({
  selector: 'app-editar-aprendiz',
  templateUrl: './editar-aprendiz.component.html',
  styleUrls: ['./editar-aprendiz.component.css']
})
export class EditarAprendizComponent implements OnInit {
  estagiario: Estagiario = {
    id: 0, // Inicialize com um valor padrão
    nome_completo: '',
    data_nascimento: '',
    email: '',
    senha: '',
    curso: '',
    ativo: false,
    nome_empresa: null
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private estagiarioService: EstagiarioService
  ) { }

  ngOnInit() {
    this.buscarEstagiario();
  }

  buscarEstagiario() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obter o ID da rota
    this.estagiarioService.buscarEstagiarioPorId(id).subscribe(
      (estagiario) => {
        this.estagiario = estagiario;
      },
      (error) => {
        console.error('Erro ao buscar estagiário:', error);
        // Tratar o erro, ex: exibir uma mensagem para o usuário
      }
    );
  }

  editar() {
    this.estagiarioService.editarEstagiario(this.estagiario).subscribe(
      () => {
        console.log('Estagiário editado com sucesso!');
        // Redirecionar para a página de lista de estagiários
        this.router.navigate(['/aprendiz']);
      },
      (error) => {
        console.error('Erro ao editar estagiário:', error);
        // Tratar o erro, ex: exibir uma mensagem para o usuário
      }
    );
  }
  cancelar() {
    this.router.navigate(['/aprendiz']);
    return 
  }
}
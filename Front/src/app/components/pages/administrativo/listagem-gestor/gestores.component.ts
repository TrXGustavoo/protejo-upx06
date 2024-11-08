import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Filter {
  nome: string;
  sobrenome: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {
  constructor(private router: Router) { }

  filter: Filter = {
    nome: '',
    sobrenome: '',
    email: '',
    status: ''
  };

  // Aqui eu simulei um dataset, precisamos fazer a busca no Bd
  gestores = [
    { nome: 'Carlos', sobrenome: 'Almeida', email: 'carlos@gmail.com', status: 'Ativo' },
    { nome: 'Fernanda', sobrenome: 'Oliveira', email: 'fernanda@gmail.com', status: 'Inativo' },
    { nome: 'Ricardo', sobrenome: 'Souza', email: 'ricardo@gmail.com', status: 'Ativo' },
    { nome: 'Juliana', sobrenome: 'Lima', email: 'juliana@gmail.com', status: 'Ativo' },
    { nome: 'Gabriel', sobrenome: 'Melo', email: 'gabriel@gmail.com', status: 'Inativo' }
  ];


  filteredGestor = this.gestores;

  ngOnInit(): void {
    this.applyFilters();
  }

  //filtragem
  applyFilters(): void {
    this.filteredGestor = this.gestores.filter(gestores => {
      return (
        (this.filter.nome ? gestores.nome.includes(this.filter.nome) : true) &&
        (this.filter.sobrenome ? gestores.sobrenome.includes(this.filter.sobrenome) : true) &&
        (this.filter.email ? gestores.email.includes(this.filter.email) : true) &&
        (this.filter.status ? gestores.status === this.filter.status : true)
      );
    });
  }

  editarAluno(aluno: any) {
    // Implementar lógica de edição
  }

  excluirGestor(aluno: any) {
    const index = this.gestores.indexOf(aluno);
    if (index > -1) {
      this.gestores.splice(index, 1); 
      this.applyFilters(); 
      console.log('gestor excluído:', aluno);
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastro-gestor']);
  }
}

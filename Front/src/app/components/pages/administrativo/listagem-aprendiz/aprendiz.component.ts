import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Filter {
  nome: string;
  sobrenome: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-aprendiz',
  templateUrl: './aprendiz.component.html',
  styleUrls: ['./aprendiz.component.css']
})
export class AprendizComponent implements OnInit {
  constructor(private router: Router) { }

  filter: Filter = {
    nome: '',
    sobrenome: '',
    email: '',
    status: ''
  };

  // Aqui eu simulei um dataset, precisamos fazer a busca no Bd
  aprendiz = [
    { nome: 'João', sobrenome: 'Silva', email: 'joao@gmail.com', status: 'Ativo' },
    { nome: 'Maria', sobrenome: 'Santos', email: 'maria@gmail.com', status: 'Inativo' },
    { nome: 'Pedro', sobrenome: 'Oliveira', email: 'pedro@gmail.com', status: 'Ativo' },
    { nome: 'Ana', sobrenome: 'Pereira', email: 'ana@gmail.com', status: 'Ativo' },
    { nome: 'Lucas', sobrenome: 'Costa', email: 'lucas@gmail.com', status: 'Inativo' }
  ];

  filteredAprendiz = this.aprendiz;

  ngOnInit(): void {
    this.applyFilters(); 
  }

  //filtragem
  applyFilters(): void {
    this.filteredAprendiz = this.aprendiz.filter(aprendiz => {
      return (
        (this.filter.nome ? aprendiz.nome.includes(this.filter.nome) : true) &&
        (this.filter.sobrenome ? aprendiz.sobrenome.includes(this.filter.sobrenome) : true) &&
        (this.filter.email ? aprendiz.email.includes(this.filter.email) : true) &&
        (this.filter.status ? aprendiz.status === this.filter.status : true)
      );
    });
  }

  editarAluno(aprendiz: any) {
    // Implementar lógica para editar aprendiz
  }
  excluirAprendiz(aprendiz: any) {
    const index = this.aprendiz.indexOf(aprendiz);
    if (index > -1) {
      this.aprendiz.splice(index, 1); 
      this.applyFilters(); 
      console.log('Aluno excluído:', aprendiz);
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastro-aprendiz']);
  }
}

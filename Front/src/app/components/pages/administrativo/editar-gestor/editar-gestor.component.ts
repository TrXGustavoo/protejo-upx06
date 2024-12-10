import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestor, GestorService } from '../../../../services/gestor.service'; 

@Component({
  selector: 'app-editar-gestor',
  templateUrl: './editar-gestor.component.html',
  styleUrls: ['./editar-gestor.component.css']
})
export class EditarGestorComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gestorService: GestorService
  ) { }

  ngOnInit() {
    this.buscarGestor();
  }

  buscarGestor() {
    const gestorId = Number(localStorage.getItem('userId'));
    console.log('id:', gestorId);
    this.gestorService.buscarGestorPorId(gestorId).subscribe(
      (gestor) => {
        this.gestor = { ...gestor }; // Copiar as propriedades do gestor
        this.gestor.data_nascimento = this.formatarData(gestor.data_nascimento); // Formatar a data
      },
      (error) => {
        console.error('Erro ao buscar gestor:', error);
      }
    );
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2); // Adicionar zero à esquerda se necessário
    const dia = ('0' + dataObj.getDate()).slice(-2); // Adicionar zero à esquerda se necessário
    return `${ano}-${mes}-${dia}`;
  }

  editar() {
    this.gestorService.editarGestor(this.gestor).subscribe(
      () => {
        console.log('Gestor editado com sucesso!');
        this.router.navigate(['/gestores']); 
      },
      (error) => {
        console.error('Erro ao editar gestor:', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/aprendiz']);
    return 
  }
}
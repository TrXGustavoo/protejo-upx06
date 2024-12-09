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
    username: '',
    empresa: ''
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gestorService.buscarGestorPorId(id).subscribe(
      (gestor) => {
        this.gestor = gestor;
      },
      (error) => {
        console.error('Erro ao buscar gestor:', error);
      }
    );
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
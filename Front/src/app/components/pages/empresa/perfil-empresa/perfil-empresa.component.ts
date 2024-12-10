import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SharedDataService } from '../../../../services/SharedData.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {
  empresa: any = {}; // Usaremos um objeto genérico para a empresa
  gestores: any[] = [];
  estagiarios: any[] = [];

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.buscarDadosEmpresa();
  }

  buscarDadosEmpresa() {
    const empresaId = this.route.snapshot.paramMap.get('id');
    if (empresaId) {
      forkJoin([
        this.empresaService.buscarEmpresaPorId(+empresaId),
        this.empresaService.buscarGestoresDaEmpresa(+empresaId),
        this.empresaService.buscarEstagiariosDaEmpresa(+empresaId)
      ]).subscribe({
        next: ([empresa, gestores, estagiarios]) => {
          this.empresa = empresa;
          this.gestores = gestores;
          this.estagiarios = estagiarios;
          console.log('Dados da empresa:', this.empresa);
          console.log('Gestores:', this.gestores);
          console.log('Estagiários:', this.estagiarios);
        },
        error: (error) => {
          console.error('Erro ao buscar dados da empresa:', error);
          // Tratar o erro, ex: exibir uma mensagem para o usuário
        }
      });
    } else {
      // Lidar com o caso em que o ID da empresa não está presente na URL
    }
  }
}
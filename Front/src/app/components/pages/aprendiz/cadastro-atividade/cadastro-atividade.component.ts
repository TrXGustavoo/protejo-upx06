import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-atividade',
  templateUrl: './cadastro-atividade.component.html',
  styleUrl: './cadastro-atividade.component.css'
})
export class CadastroAtividadeComponent {

  constructor(private router: Router) { }


  // Método chamado ao clicar na imagem
  importarArquivo() {
    // Aciona o clique do input de arquivo
    const fileInput: HTMLElement = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  // Método chamado quando o arquivo for selecionado
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name);
    }
  }

  cancelar() {
    this.router.navigate(['perfil-aprendiz']);
  }
}

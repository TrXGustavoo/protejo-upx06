import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { GestoresComponent } from './components/pages/administrativo/listagem-gestor/gestores.component';
import { AprendizComponent } from './components/pages/administrativo/listagem-aprendiz/aprendiz.component';
import { CadastroAprendizComponent } from './components/pages/administrativo/cadastro-aprendiz/cadastro-aprendiz.component';
import { CadastroGestorComponent } from './components/pages/administrativo/cadastro-gestor/cadastro-gestor.component';
import { EditarAprendizComponent } from './components/pages/administrativo/editar-aprendiz/editar-aprendiz.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'aprendiz', component: AprendizComponent },
  { path: 'gestores', component: GestoresComponent },
  { path: 'cadastro-aprendiz', component: CadastroAprendizComponent },
  { path: 'cadastro-gestor', component: CadastroGestorComponent },
  { path: 'editar-aprendiz/:id', component: EditarAprendizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

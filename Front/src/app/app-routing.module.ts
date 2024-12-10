import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { GestoresComponent } from './components/pages/administrativo/listagem-gestor/gestores.component';
import { AprendizComponent } from './components/pages/administrativo/listagem-aprendiz/aprendiz.component';
import { CadastroAprendizComponent } from './components/pages/administrativo/cadastro-aprendiz/cadastro-aprendiz.component';
import { CadastroGestorComponent } from './components/pages/administrativo/cadastro-gestor/cadastro-gestor.component';
import { EditarAprendizComponent } from './components/pages/administrativo/editar-aprendiz/editar-aprendiz.component';
import { EditarGestorComponent } from './components/pages/administrativo/editar-gestor/editar-gestor.component';
import { PerfilComponent } from './components/pages/aprendiz/perfil/perfil.component';
import { CadastroAtividadeComponent } from './components/pages/aprendiz/cadastro-atividade/cadastro-atividade.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedComponent } from './components/shared/shared.component';
import { AuthGuard } from './guards/auth.guard';
import { AprendizGuard } from './guards/aprendiz.guard';
import { GestorGuard } from './guards/gestor.guard';
import { PerfilGestorComponent } from './components/pages/gestor/perfil-gestor/perfil-gestor.component';
import { LoginEmpresaComponent } from './components/pages/login-empresa/login-empresa.component';
import { PerfilEmpresaComponent } from './components/pages/empresa/perfil-empresa/perfil-empresa.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: SharedComponent,
    children: [
      { path: 'aprendiz', component: AprendizComponent, canActivate: [AuthGuard] },
      { path: 'gestores', component: GestoresComponent, canActivate: [AuthGuard]},
      { path: 'cadastro-aprendiz', component: CadastroAprendizComponent },
      { path: 'cadastro-gestor', component: CadastroGestorComponent },
      { path: 'editar-aprendiz/:id', component: EditarAprendizComponent },
      { path: 'editar-gestor/:id', component: EditarGestorComponent,  canActivate: [AuthGuard] },
      { path: 'perfil-aprendiz/:id', component: PerfilComponent}, 
      { path: 'perfil-gestor', component: PerfilGestorComponent}, 
      { path: 'login-empresa', component: LoginEmpresaComponent }, 
      { path: 'perfil-empresa/:id', component: PerfilEmpresaComponent},

    ]
  },
  
  { path: 'cadastro-atividade', component: CadastroAtividadeComponent } 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

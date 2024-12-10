// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const url = route.url[0].path; // Pega o nome da rota

    // Logica para proteger a rota de gestores
    if (tipoUsuario === 'gestor') {
      if (url === 'aprendiz' || url === 'editar-gestor' || url === 'perfil-gestor') {
        return true;
      } else {
        this.router.navigate(['/perfil-gestor']); // Redireciona para a página de gestores
        return false;
      }
    }

    // Logica para proteger a rota de estagiarios
    if (tipoUsuario === 'estagiario') {
      if (url === 'perfil-aprendiz') {
        return true;
      } else {
        this.router.navigate(['/perfil-aprendiz']); // Redireciona para a página de perfil do estagiário
        return false;
      }
    }

    // Logica para proteger a rota de empresas
    if (tipoUsuario === 'empresa') {
        return true;
    }

    // Se não estiver logado, redireciona para o login
    this.router.navigate(['/login']);
    return false;
  }
}
// gestor.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const tipoUsuario = localStorage.getItem('tipoUsuario');

    // Bloquear acesso à rota /gestores para gestores
    if (state.url === '/gestores' && tipoUsuario === 'gestor') {
      this.router.navigate(['/']); // Redirecionar para a página inicial, por exemplo
      return false;
    }

    // Permitir acesso à rota /aprendiz para gestores
    if (state.url === '/aprendiz' && tipoUsuario === 'gestor') {
      return true;
    }

    // Lógica padrão para gestores
    if (tipoUsuario === 'gestor') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
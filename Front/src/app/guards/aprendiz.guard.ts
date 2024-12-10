// aprendiz.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AprendizGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const tipoUsuario = localStorage.getItem('tipoUsuario');

    // Bloquear acesso à rota /aprendiz
    if (state.url === '/aprendiz' && tipoUsuario === 'aprendiz') {
      this.router.navigate(['/']); // Redirecionar para a página inicial, por exemplo
      return false;
    }

    // Permitir acesso a outras rotas se for aprendiz
    if (tipoUsuario === 'aprendiz') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
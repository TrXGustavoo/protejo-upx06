// empresa.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'empresa') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
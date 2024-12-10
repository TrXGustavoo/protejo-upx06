import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estagiario } from './api.service'; // Importe o tipo Estagiario

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private estagiariosSubject = new BehaviorSubject<Estagiario[]>([]);
  estagiarios$ = this.estagiariosSubject.asObservable();

  atualizarEstagiarios(estagiarios: Estagiario[]) {
    this.estagiariosSubject.next(estagiarios);
  }
}
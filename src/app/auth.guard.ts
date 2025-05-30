import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('entrou no canActivate')
    const loggedIn = !!localStorage.getItem('user'); // Exemplo simples de validação
    if (!loggedIn) {
      this.router.navigate(['createsession/teste']);
      return false;
    }
    return true;
  }
}

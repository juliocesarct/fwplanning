import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot,): boolean {
    route.paramMap.get('id')
    const loggedIn = !!localStorage.getItem('user'); // Exemplo simples de validação
    if (!loggedIn) {
      this.router.navigate(['joinsession/',route.paramMap.get('id')]);
      return false;
    }
    return true;
  }
}

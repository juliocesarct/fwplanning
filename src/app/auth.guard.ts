import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router)

  canActivate( route: ActivatedRouteSnapshot,): boolean {
    route.paramMap.get('sessionId')
    const loggedIn = !!localStorage.getItem('user'); // Exemplo simples de validação
    if (!loggedIn) {
      this.router.navigate(['joinsession/',route.paramMap.get('sessionId')]);
      return false;
    }
    return true;
  }
}

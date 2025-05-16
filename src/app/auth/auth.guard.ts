import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const url = state.url;
    const isRutaPrivada = url.startsWith('/home') || url.startsWith('/mis-opiniones') || url.startsWith('/actores') || url.startsWith('/soundtrack') || url.startsWith('/details-list');
    const esLoginORegister = url === '/login' || url === '/register';

    // 🚫 No autenticado queriendo acceder a privada → redirigir a login
    if (!isAuthenticated && isRutaPrivada) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ No autenticado accediendo a login/register → permitido
    if (!isAuthenticated) {
      return true;
    }

    // ✅ Autenticado accediendo a rutas privadas → permitido
    if (isAuthenticated && !esLoginORegister) {
      return true;
    }

    // 🔁 Autenticado queriendo acceder a login/register → redirigir a home
    if (esLoginORegister) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}

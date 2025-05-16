import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '../app/public-layout/public-layout.component';
import { PrivateLayoutComponent } from '../app/private-layout/private-layout.component';
import { AuthGuard } from '../app/auth/auth.guard';

export const routes: Routes = [
  // 🔁 Redirección inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🟢 Rutas públicas (sin AuthGuard)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },

  // 🔒 Rutas privadas (con AuthGuard)
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'mis-opiniones',
        loadComponent: () => import('./mis-opiniones/mis-opiniones.component').then(m => m.MisOpinionesComponent)
      },
      {
        path: 'actores',
        loadComponent: () => import('./personajes/personajes.component').then(m => m.PersonajesComponent)
      },
      {
        path: 'soundtrack',
        loadComponent: () => import('./soundtracks/soundtracks.component').then(m => m.SoundtracksComponent)
      },
      {
        path: 'details-list/:id',
        loadComponent: () => import('./details-list/details-list.component').then(m => m.DetailsListComponent)
      }
    ]
  },

  // 🌐 Ruta comodín (404 → login)
  {
    path: '**',
    redirectTo: 'login'
  }
];

import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [


    // pública
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },

 {
    path: 'pedidos',
    loadComponent: () =>
      import('./pages/pedidos/pedidos')
        .then(m => m.PedidosComponent),
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];
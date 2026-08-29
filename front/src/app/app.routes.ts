import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { Item } from './pages/item/item';

export const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'item/:id', component: Item },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];

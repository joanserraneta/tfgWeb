import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { Item } from './pages/item/item';
import { PrincipalCarrito } from './pages/principal-carrito/principal-carrito';
import { FinalCompra } from './pages/final-compra/final-compra';

export const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'item/:id', component: Item },
  { path: 'principalCarrito', component: PrincipalCarrito },
  { path: 'finalCompra', component: FinalCompra},
  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];

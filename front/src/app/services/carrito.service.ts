import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = [];

  add(producto: any) {
    this.carrito.push(producto);
  }

  getCarrito() {
    return this.carrito;
  }

  clear() {
    this.carrito = [];
  }
}

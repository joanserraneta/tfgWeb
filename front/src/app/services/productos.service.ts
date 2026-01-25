import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends ApiService {

  getProductos() {
    return this.get('/productos');
  }

  getProducto(id: number) {
    return this.get(`/productos/${id}`);
  }
}

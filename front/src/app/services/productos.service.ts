import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , map} from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  vendedor_id: number;
  imagen_portada_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos/`);
  }

  getProducto(id: number): Observable<Producto | undefined> {
    return this.getProductos().pipe(
      map(productos =>
        productos.find(producto => Number(producto.id) === id)
      )
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  cargando = true;
  error = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');

    this.productosService.getProductos().subscribe({
      next: (data) => {
        console.log('Productos recibidos:', data);
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }
}

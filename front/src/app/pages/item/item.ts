import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ProductosService
} from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';


import { MatGridListModule } from '@angular/material/grid-list';


interface Cantidades {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatButtonModule, MatChipsModule,
    MatIconModule, MatSelectModule, FormsModule, MatMenuModule
  ],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit {

  producto?: Producto;
  cargando = true;
  error = '';


  cantidades: Cantidades[] = [
    { value: 500, viewValue: '500 g' },
    { value: 1000, viewValue: '1 kg' },
    { value: 1500, viewValue: '1.5 kg' },
    { value: 2000, viewValue: '2 kg' },
    { value: 3000, viewValue: '3 kg' }
  ];
  cantidadesSeleccionadas: { [productoId: number]: number } = {};

  imagenesProducto: string[] = [];
  imagenActual = 0;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef,
    public carritoService: CarritoService
  ) { }
  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'E identificador del producto no es valido';
      this.cargando = false;
      return;
    }


    this.productosService.getProducto(id).subscribe({
      next: producto => {


        if (producto) {
          this.producto = producto;
          this.imagenesProducto = [
            producto.imagen_portada_url || '/img/productos/default.png',
            '/img/productos/naranja1.jpg'];
          this.imagenActual = 0;
        } else {
          this.error = 'No se ha encontrado el producto';
        }
        this.cargando = false;
        this.cdr.markForCheck();

      },

      error: error => {
        console.error('Error al obtener el producto:', error);
        this.error = 'No se pudo cargar el producto';
        this.cargando = false;
      }
    });
  }




  // Cambia a la siguiente imagen
  siguienteImagen(): void {
    this.imagenActual++;

    if (this.imagenActual >= this.imagenesProducto.length) {
      this.imagenActual = 0;
    }
  }

  // Cambia a la imagen anterior
  anteriorImagen(): void {
    this.imagenActual--;

    if (this.imagenActual < 0) {
      this.imagenActual = this.imagenesProducto.length - 1;
    }
  }

  // Permite seleccionar una imagen pulsando su miniatura
  seleccionarImagen(index: number): void {
    this.imagenActual = index;
  }
  addToCart(producto: Producto) {
    const cantidad = this.cantidadesSeleccionadas[producto.id];

    if (cantidad === undefined) {
      return;
    }
    this.carritoService.add(producto, cantidad);
  }
}

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';


interface Cantidades {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatToolbarModule, MatIconModule, MatPaginatorModule
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  productos: Producto[] = [];
  cargando = true;
  error = '';

  bannerImagenes = [
    {
      src: '/img/banner1.jpg',
      titulo: 'Verduras frescas de temporada',
      texto: 'Compra productos frescos directamente desde nuestra tienda'
    },
    {
      src: '/img/banner2.png',
      titulo: 'Fruta y verdura de calidad',
      texto: 'Seleccionamos productos frescos para tu día a día'
    },
    {
      src: '/img/banner3.jpg',
      titulo: 'Productos saludables',
      texto: 'Llena tu carrito con alimentos naturales'
    }
  ];

  bannerActual = 0;
  private intervaloBanner: any;

  cantidades: Cantidades[] = [
    { value: '500 g', viewValue: '500 g' },
    { value: '1 kg', viewValue: '1 kg' },
    { value: '1.5 kg', viewValue: '1.5 kg' },
    { value: '2 kg', viewValue: '2 kg' },
    { value: '3 kg', viewValue: '3 kg' }
  ];
  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargandoProductos();
    this.iniciaBanner();
  }

  ngOnDestroy(): void {
    if (this.intervaloBanner) {
      clearInterval(this.intervaloBanner);
    }
  }

  cantidadesSeleccionadas: { [productoId: number]: string } = {};

  agregarAlCarrito(producto: Producto): void {
    const cantidad = this.cantidadesSeleccionadas[producto.id];

    if (!cantidad) {
      alert('Selecciona una cantidad');
      return;
    }

    console.log('Producto:', producto);
    console.log('Cantidad:', cantidad);
  }

  iniciaBanner() {
    this.intervaloBanner = setInterval(() => {
      this.siguienteBanner();
    }, 5000);
  }


  reiniciarBanner(): void {
    if (this.intervaloBanner) {
      clearInterval(this.intervaloBanner);
    }

    this.iniciaBanner();
  }

  siguienteBanner() {
    this.bannerActual++;
    if (this.bannerActual >= this.bannerImagenes.length) {
      this.bannerActual = 0;
    }
    this.reiniciarBanner();
    this.cdr.markForCheck();
  }

  anteriorBanner() {
    this.bannerActual--;
    if (this.bannerActual < 0) {
      this.bannerActual = this.bannerImagenes.length - 1;
    }
    this.reiniciarBanner();
    this.cdr.markForCheck();
  }

  irABanner(index: number): void {
    this.bannerActual = index;
    this.cdr.markForCheck();
  }

  cargandoProductos(): void {
    console.log('ngOnInit ejecutado');

    this.productosService.getProductos().subscribe({
      next: (data) => {
        console.log('Productos recibidos:', data);
        this.productos = [...data];
        this.cargando = false;
        this.error = '';

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }


}

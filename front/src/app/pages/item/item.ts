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
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';


import {MatGridListModule} from '@angular/material/grid-list';


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
export class Item implements OnInit{

  producto? : Producto;
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

  constructor(
    private route : ActivatedRoute,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef,
    public carritoService: CarritoService
  ){}
  ngOnInit(): void {
    console.log('HE ENTRADO EN NGONINIT');

    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', id);

    if (!id){
      this.error = 'E identificador del producto no es valido';
      this.cargando = false;
      return;
    }

    this.productosService.getProducto(id).subscribe({
      next: producto => {
        console.log('Producto recibido:', producto);

        if (producto) {
          this.producto = producto;
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

  addToCart(producto: Producto){
    const cantidad = this.cantidadesSeleccionadas[producto.id] ?? 1;

    this.carritoService.add(producto, cantidad);
    console.log(this.carritoService.productos());
  }
}

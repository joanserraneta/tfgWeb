import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Producto,
  ProductosService
} from '../../services/productos.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatToolbar} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatButtonModule, MatToolbar, MatIcon, MatChipsModule, RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit{

  producto? : Producto;
  cargando = true;
  error = '';

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'two', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'tres', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'cuatro', cols: 3, rows: 1, color: 'lightpink'},
    {text: 'cinco', cols: 10, rows: 2, color: 'lightpink'},
    {text: 'Three', cols: 2, rows: 2, color: 'lightpink'},
  ];

  constructor(
    private route : ActivatedRoute,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
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
}

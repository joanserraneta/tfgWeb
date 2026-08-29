import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Producto,
  ProductosService
} from '../../services/productos.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit{

  producto? : Producto;
  cargando = true;
  error = '';

  constructor(
    private route : ActivatedRoute,
    private productosService: ProductosService
  ){}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id){
      this.error = 'E identificador del producto no es valido';
      this.cargando = false;
      return;
    }

    this.productosService.getProducto(id).subscribe({
      next: producto =>  {
        if(producto) {
          this.producto = producto;
        }else{
          this.error = 'No se ha encontrado el producto';
        }
        this.cargando = false;
      },
      error: error =>{
        console.error('Error al obtene el producto', error)
      },
    })
  }
}

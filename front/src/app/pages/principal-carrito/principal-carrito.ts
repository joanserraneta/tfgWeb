import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-principal-carrito',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './principal-carrito.html',
  styleUrl: './principal-carrito.css',
})
export class PrincipalCarrito {
    constructor(
    public carritoService: CarritoService
  ) { }


}

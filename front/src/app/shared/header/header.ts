import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(
    public carritoService: CarritoService
  ) {}
}
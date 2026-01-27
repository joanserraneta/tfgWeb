import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
})
export class PedidosComponent implements OnInit {

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (data: any) => console.log('Pedidos:', data),
      error: (err: any) => console.log('Backend aún no existe')
    });
  }
}

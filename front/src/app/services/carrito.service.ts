import { Injectable, computed, signal } from '@angular/core';
import { Producto } from '../models/producto';


// Representa una línea del carrito.
// Guardamos el producto completo y la cantidad de unidades de ese producto.
export interface ProductoCarrito {
  producto: Producto;
  cantidad: number;
}


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // Signal privado donde se guarda el carrito real.
  // Al principio está vacío.
  private _productos = signal<ProductoCarrito[]>([]);


  // Permite que otros componentes puedan LEER el carrito,
  // pero no modificar directamente el signal.
  //
  // Se accedería con:
  // carritoService.productos()
  productos = this._productos.asReadonly();


  // Calcula automáticamente el número TOTAL de unidades.
  //
  // Por ejemplo:
  // Plátano x3
  // Tomate  x2
  //
  // totalUnidades() = 5
  totalGramos = computed(() =>
    this._productos().reduce(
      (total, item) => total + item.cantidad,
      0
    )
  );

totalKilos = computed(() =>
  this.totalGramos() / 1000
);
  // Calcula automáticamente el precio total del carrito.
  //
  // Por ejemplo:
  // Plátano: 2.50 € x 3 = 7.50 €
  // Tomate:  1.80 € x 2 = 3.60 €
  //
  // subtotal() = 11.10 €
  subtotal = computed(() =>
    this._productos().reduce(
      (total, item) =>
        total + Number(item.producto.precio) * (item.cantidad / 1000),
      0
    )
  );



  // Añade un producto al carrito.
  //
  // Si no indicamos cantidad, por defecto añade 1.
  //
  // Ejemplo:
  // añadir(platano)
  // añadir(platano, 3)
  add(producto: Producto, cantidad: number = 1) {

    // Buscamos si ese producto ya existe en el carrito
    // comparando su id.
    const existente = this._productos().find(
      item => item.producto.id === producto.id
    );


    // Si YA existe, no añadimos otra línea.
    // Simplemente aumentamos su cantidad.
    if (existente) {

      this._productos.update(productos =>
        productos.map(item =>

          // Si es el producto que queremos añadir...
          item.producto.id === producto.id

            // ...hacemos una copia del item y aumentamos la cantidad.
            ? {
                ...item,
                cantidad: item.cantidad + cantidad
              }

            // Si es otro producto, lo dejamos igual.
            : item
        )
      );

    } else {

      // Si el producto NO existía todavía,
      // conservamos todos los productos anteriores
      // y añadimos uno nuevo al final.
      this._productos.update(productos => [
        ...productos,
        {
          producto: producto,
          cantidad: cantidad
        }
      ]);

    }
  }


  // Elimina completamente un producto del carrito
  // usando su id.
  //
  // filter() conserva todos los productos
  // cuyo id sea distinto al que queremos borrar.
  eliminar(productoId: number) {

    this._productos.update(productos =>
      productos.filter(
        item => item.producto.id !== productoId
      )
    );

  }


  vaciar() {
    this._productos.set([]);
  }

}
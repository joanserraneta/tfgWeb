from pydantic import BaseModel
from decimal import Decimal


class ProductoUpdate(BaseModel):
    nombre: str
    descripcion: str | None = None
    precio: Decimal
    stock: int
    vendedor_id: int

class UsuarioUpdate(BaseModel):
    id : int
    email : str
    password_hash : str
    nombre : str
    creado_en : str

class CarritoProductos(BaseModel):
    nombre: str
    id: str
    precio: Decimal
    cantidad: Decimal


class Carrito(BaseModel):
    id: str
    id_usuario: str
    productos: CarritoProductos

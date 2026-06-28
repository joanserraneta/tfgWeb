from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base

class Carrito(Base):
    __tablename__ = "carrito"

    id = Column(Integer, primary_key=True, index=True)

    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    creado_en = Column(DateTime(timezone=True), server_default=func.now())

    usuario = relationship("Usuario", back_populates="carritos")

    productos = relationship(
        "CarritoProducto",
        back_populates="carrito",
        cascade="all, delete-orphan"
    )


class CarritoProducto(Base):
    __tablename__ = "carrito_productos"

    id = Column(Integer, primary_key=True, index=True)

    carrito_id = Column(Integer, ForeignKey("carrito.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)

    cantidad = Column(Numeric(10, 2), nullable=False)
    unidad = Column(String(20), nullable=False, default="kg")

    precio_unitario = Column(Numeric(10, 2), nullable=False)

    carrito = relationship("Carrito", back_populates="productos")
    producto = relationship("Producto")
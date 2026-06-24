from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Carrito(Base):
    __tablename__ = "carrito"

    id = Column(Integer, primary_key=True, index=True)

    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)

    # Fecha de creación del carrito
    creado_en = Column(DateTime(timezone=True), server_default=func.now())

    # Relación con los productos del carrito
    productos = relationship(
        "CarritoProductos",
        back_populates="carrito",
        cascade="all, delete-orphan"
    )


class CarritoProductos(Base):
    __tablename__ = "carrito_productos"

    id = Column(Integer, primary_key=True, index=True)

    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    carrito_id = Column(Integer, ForeignKey("carritos.id"), nullable=False)

    nombre = Column(String(150), nullable=False)
    cantidad = Column(Numeric(10, 2), nullable=False)
    unidad = Column(String(20), nullable=False, default="kg")

    # Precio del producto en el momento de añadirlo al carrito
    precio_unitario = Column(Numeric(10, 2), nullable=False)
    carrito = relationship("Carrito", back_populates="productos")
    producto = relationship("Producto")

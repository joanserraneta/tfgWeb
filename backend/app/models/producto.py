from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    descripcion = Column(Text)
    precio = Column(Numeric(10, 2), nullable=False)
    stock = Column(Integer, nullable=False)
    imagen_portada_url = Column(String(500), nullable=True)

    imagenes = relationship(
        "ProductoImagen",
        back_populates="producto",
        cascade="all, delete-orphan"
    )

    vendedor_id = Column(Integer, ForeignKey("vendedores.id"), nullable=False)

    vendedor = relationship(
        "Vendedor",
        back_populates="productos"
    )


class ProductoImagen(Base):
    __tablename__ = "producto_imagenes"

    id = Column(Integer, primary_key=True, index=True)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    imagen_url = Column(String(500), nullable=False)
    orden = Column(Integer, default=0)
    producto = relationship("Producto", back_populates="imagenes")
from sqlalchemy import Column, Integer, DECIMAL, ForeignKey, Enum, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    total = Column(DECIMAL(10,2), nullable=False)
    estado = Column(Enum("pendiente", "pagado", "enviado"), default="pendiente")
    creado_en = Column(DateTime(timezone=True), server_default=func.now())

    productos = relationship("PedidoProducto", back_populates="pedido")


class PedidoProducto(Base):
    __tablename__ = "pedido_productos"

    id = Column(Integer, primary_key=True, index=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(DECIMAL(10,2), nullable=False)

    pedido = relationship("Pedido", back_populates="productos")

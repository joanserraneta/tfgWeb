from sqlalchemy import Column, Integer, ForeignKey, Decimal
from sqlalchemy.orm import relationship
from app.database import Base

class PedidoProducto(Base):
    __tablename__ = "pedido_productos"

    id = Column(Integer, primary_key=True, index=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(Decimal(10,2), nullable=False)

    pedido = relationship("Pedido", back_populates="productos")

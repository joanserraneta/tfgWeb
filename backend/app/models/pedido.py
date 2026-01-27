from sqlalchemy import Column, Integer, Decimal, ForeignKey, Enum, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    total = Column(Decimal(10,2), nullable=False)
    estado = Column(Enum("pendiente", "pagado", "enviado"), default="pendiente")
    creado_en = Column(DateTime(timezone=True), server_default=func.now())

    productos = relationship("PedidoProducto", back_populates="pedido")

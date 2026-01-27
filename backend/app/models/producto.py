from sqlalchemy import Column, Integer, String, Text, Decimal, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    descripcion = Column(Text)
    precio = Column(Decimal(10, 2), nullable=False)
    stock = Column(Integer, nullable=False)

    vendedor_id = Column(Integer, ForeignKey("vendedores.id"), nullable=False)
    creado_en = Column(DateTime(timezone=True), server_default=func.now())

    vendedor = relationship("Vendedor", back_populates="productos")

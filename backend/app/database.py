from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://AdminTienda:admintienda@localhost:3306/tienda_marketplace"

engine = create_engine(
    DATABASE_URL,
    echo=True,       
    pool_pre_ping=True  # evita conexiones muertas
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

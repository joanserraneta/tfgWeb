from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL

# Función para obtener la base de datos
# 1. Llega una petición HTTP
# 2. FastAPI llama a get_db()
# 3. get_db() crea una sesión con SessionLocal()
# 4. El endpoint usa esa sesión para consultar o modificar la base de datos
# 5. Cuando termina la petición, la sesión se cierra con db.close()

engine = create_engine(
    DATABASE_URL,
    echo=True,       
)
#Esto crea una fábrica de sesiones. Es decir, no es una sesión concreta, sino una forma de crear sesiones cada vez que llegue una petición. Una sesión es el objeto que se usa en los endpoints para hablar con la base de datos.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

#Sirve para crear la clase base de tus modelos. los modelos como Usuario, Producto, Pedido, etc., heredan de esa base:
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
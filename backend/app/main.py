from fastapi import FastAPI
from app.database import Base, engine
from app.routers import auth
import app.models
app = FastAPI()

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

# Registrar routers
app.include_router(auth.router)

@app.get("/db-test")
def db_test():
    return {"db": "ok"}

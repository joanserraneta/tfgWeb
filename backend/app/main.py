from fastapi import FastAPI
from app.database import Base, engine
from app.routers import auth
import app.models
from app.routers import productos
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

# Registrar routers
app.include_router(auth.router)
app.include_router(productos.router)


@app.get("/db-test")
def db_test():
    return {"db": "ok"}

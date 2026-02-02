from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.producto import Producto
from app.models.vendedor import Vendedor
from app.auth.security import get_current_user

router = APIRouter(
    prefix="/productos",
    tags=["Productos"]
)

@router.get("/")
def listar_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()


@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_producto(
    nombre: str,
    descripcion: str,
    precio: float,
    stock: int,
    vendedor_id: int,
    db: Session = Depends(get_db), 
    user_email: str = Depends(get_current_user)
):
    vendedor = db.query(Vendedor).filter(Vendedor.id == vendedor_id).first()

    if not vendedor:
        raise HTTPException(status_code=404, detail="Vendedor no encontrado")

    producto = Producto(
        nombre=nombre,
        descripcion=descripcion,
        precio=precio,
        stock=stock,
        vendedor_id=vendedor_id
    )

    db.add(producto)
    db.commit()
    db.refresh(producto)

    return producto
    

@router.delete("/{producto_id}")
def borrar_producto(
    producto_id: int,
    db: Session = Depends(get_db),
    user_email: str = Depends(get_current_user)
):
    producto = db.query(Producto).filter(Producto.id == producto_id).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    # luego validaremos que el usuario sea el dueño
    db.delete(producto)
    db.commit()

    return {"message": "Producto eliminado"}


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.producto import Producto
from app.models.vendedor import Vendedor
from app.schemas.schemasMain import ProductoUpdate
from app.auth.security import get_current_user



router = APIRouter(
    prefix="/carrito",
    tags=["Carrito"]
)


# Endpoint para listar todos los productos.
# Como el router tiene prefix="/productos", esta ruta será:
# GET /productos/
@router.get("/")
def listar_productos(db: Session = Depends(get_db)):


    # db.query(Producto) prepara una consulta sobre la tabla productos.
    # .all() ejecuta la consulta y devuelve todos los productos.
    return db.query(Producto).all()


@router.post("/", status_code=status.HTTP_201_CREATED)
def anadir_producto_carrito(
    # Datos necesarios para crear el producto.
    # En tu versión actual se reciben como parámetros simples.
    id_usuario: str,
    id_producto: str,
    unidadOkilo: bool,
    cantidad : int,
    db: Session = Depends(get_db)
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


    # Buscamos el producto en la base de datos usando su ID.
    producto = db.query(Producto).filter(Producto.id == producto_id).first()

    # Si el producto no existe, devolvemos un error 404.
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")


    # Marcamos el producto para eliminarlo.
    db.delete(producto)

    # Confirmamos la eliminación en la base de datos.
    db.commit()

    # Devolvemos una respuesta sencilla indicando que se ha eliminado.
    return {"message": "Producto eliminado"}

@router.put("/{producto_id}")
def actualiza_producto(
    producto_id: int,
    datos_producto: ProductoUpdate,
    db : Session = Depends(get_db),
    user_email: str = Depends(get_current_user)
):
    producto = db.query(Producto).filter(Producto.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail ="Producto no encontrado")
    
    producto.nombre = datos_producto.nombre
    producto.descripcion = datos_producto.descripcion
    producto.precio = datos_producto.precio
    producto.vendedor_id = datos_producto.vendedor_id
    producto.stock = datos_producto.stock

    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto




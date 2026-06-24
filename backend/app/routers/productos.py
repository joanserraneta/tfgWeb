# Importamos APIRouter para poder crear un grupo de rutas/endpoints.
# Depends se usa para inyectar dependencias, por ejemplo la sesión de base de datos
# o el usuario autenticado.
# status contiene códigos HTTP ya preparados, como 201 CREATED.
from fastapi import APIRouter, Depends, HTTPException, status

# Importamos Session, que representa una sesión activa con la base de datos.
# Esta sesión se usará para hacer consultas, inserts, deletes, etc.
from sqlalchemy.orm import Session

# Importamos get_db, que abre y cierra una sesión de base de datos por cada petición.
# Esta función viene de database.py.
from app.database import get_db

# Importamos el modelo Producto.
# Este modelo representa la tabla "productos" de la base de datos.
from app.models.producto import Producto

# Importamos el modelo Vendedor.
# Se usa al crear un producto para comprobar que el vendedor indicado existe.
from app.models.vendedor import Vendedor
from app.schemas.schemasMain import ProductoUpdate

# Importamos get_current_user.
# Esta función se usa para proteger endpoints y comprobar que el usuario tiene
# un token JWT válido.
from app.auth.security import get_current_user


# Creamos un router específico para productos.
# prefix="/productos" significa que todas las rutas de este archivo empiezan por /productos.
# tags=["Productos"] sirve para agrupar estos endpoints en la documentación Swagger.
router = APIRouter(
    prefix="/productos",
    tags=["Productos"]
)


# Endpoint para listar todos los productos.
# Como el router tiene prefix="/productos", esta ruta será:
# GET /productos/
@router.get("/")
def listar_productos(db: Session = Depends(get_db)):
    """
    Devuelve todos los productos guardados en la base de datos.

    Parámetros:
    - db: sesión de base de datos proporcionada automáticamente por FastAPI.

    Funcionamiento:
    1. Recibe una sesión de base de datos.
    2. Consulta todos los registros de la tabla productos.
    3. Devuelve la lista completa de productos.
    """

    # db.query(Producto) prepara una consulta sobre la tabla productos.
    # .all() ejecuta la consulta y devuelve todos los productos.
    return db.query(Producto).all()


# Endpoint para crear un nuevo producto.
# Como el router tiene prefix="/productos", esta ruta será:
# POST /productos/
#
# status_code=status.HTTP_201_CREATED indica que, si todo va bien,
# la respuesta tendrá código 201, que significa "creado correctamente".
@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_producto(
    # Datos necesarios para crear el producto.
    # En tu versión actual se reciben como parámetros simples.
    nombre: str,
    descripcion: str,
    precio: float,
    stock: int,
    vendedor_id: int,

    # Sesión de base de datos.
    db: Session = Depends(get_db),

    # Usuario autenticado.
    # Depends(get_current_user) obliga a que la petición tenga un token JWT válido.
    # Si el token no existe o no es válido, FastAPI devolverá error 401.
    user_email: str = Depends(get_current_user)
):
    """
    Crea un nuevo producto en la base de datos.

    Parámetros:
    - nombre: nombre del producto.
    - descripcion: descripción del producto.
    - precio: precio del producto.
    - stock: cantidad disponible.
    - vendedor_id: identificador del vendedor asociado al producto.
    - db: sesión de base de datos.
    - user_email: usuario autenticado obtenido desde el token JWT.

    Funcionamiento:
    1. Comprueba que existe un vendedor con el ID recibido.
    2. Si el vendedor no existe, devuelve error 404.
    3. Si existe, crea un objeto Producto.
    4. Lo guarda en la base de datos.
    5. Devuelve el producto creado.
    """

    # Buscamos en la tabla vendedores un vendedor cuyo id coincida con vendedor_id.
    vendedor = db.query(Vendedor).filter(Vendedor.id == vendedor_id).first()

    # Si no se encuentra ningún vendedor, no tiene sentido crear el producto,
    # porque cada producto necesita estar asociado a un vendedor existente.
    if not vendedor:
        raise HTTPException(status_code=404, detail="Vendedor no encontrado")

    # Creamos una instancia del modelo Producto.
    # Todavía no está guardada en la base de datos; solo está creada en memoria.
    producto = Producto(
        nombre=nombre,
        descripcion=descripcion,
        precio=precio,
        stock=stock,
        vendedor_id=vendedor_id
    )

    # Añadimos el nuevo producto a la sesión de base de datos.
    db.add(producto)

    db.commit()

    # Actualizamos el objeto producto con los datos generados por la base de datos,
    # por ejemplo el id autoincremental.
    db.refresh(producto)

    return producto
    

# Endpoint para borrar un producto por su ID.
# Como el router tiene prefix="/productos", esta ruta será:
# DELETE /productos/{producto_id}
@router.delete("/{producto_id}")
def borrar_producto(
    # ID del producto que se quiere eliminar.
    producto_id: int,

    # Sesión de base de datos.
    db: Session = Depends(get_db),

    # Usuario autenticado.
    # Este endpoint también está protegido por JWT.
    user_email: str = Depends(get_current_user)
):
    """
    Elimina un producto de la base de datos.

    Parámetros:
    - producto_id: identificador del producto que se quiere borrar.
    - db: sesión de base de datos.
    - user_email: usuario autenticado obtenido desde el token JWT.

    Funcionamiento:
    1. Busca el producto por su ID.
    2. Si no existe, devuelve error 404.
    3. Si existe, lo elimina de la base de datos.
    4. Devuelve un mensaje de confirmación.
    """

    # Buscamos el producto en la base de datos usando su ID.
    producto = db.query(Producto).filter(Producto.id == producto_id).first()

    # Si el producto no existe, devolvemos un error 404.
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    # Aquí tienes un comentario indicando una mejora futura:
    # validar que el usuario autenticado sea realmente el dueño del producto.
    # Ahora mismo, cualquier usuario autenticado podría borrar cualquier producto.
    # luego validaremos que el usuario sea el dueño

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




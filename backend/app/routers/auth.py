from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.schemas import UserCreate, UserLogin, Token
from app.auth.security import hash_password, verify_password, create_access_token
from app.auth.deps import get_db
from app.models.usuario import Usuario
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    exists = db.query(Usuario).filter(Usuario.email == user.email).first()
    if exists:
        raise HTTPException(status_code=400, detail="Email ya registrado")

    new_user = Usuario(
        email=user.email,
        password_hash=hash_password(user.password),
        nombre=user.nombre
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuario creado correctamente"}

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    token = create_access_token({"sub": user.id})
    return {"access_token": token}
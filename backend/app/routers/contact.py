from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import ContactMessage, User
from app.routers.auth import get_current_admin
from app.schemas.schemas import ContactMessageCreate, ContactMessageOut

router = APIRouter()


@router.post("/", response_model=ContactMessageOut, status_code=status.HTTP_201_CREATED)
def submit_contact_message(payload: ContactMessageCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(**payload.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@router.get("/", response_model=list[ContactMessageOut])
def list_contact_messages(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
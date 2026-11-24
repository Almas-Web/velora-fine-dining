from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Reservation, User
from app.routers.auth import get_current_admin
from app.schemas.schemas import ReservationCreate, ReservationOut, ReservationStatusUpdate

router = APIRouter()


@router.post("/", response_model=ReservationOut, status_code=status.HTTP_201_CREATED)
def create_reservation(payload: ReservationCreate, db: Session = Depends(get_db)):
    reservation = Reservation(**payload.model_dump(), status="Pending")
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation


@router.get("/", response_model=list[ReservationOut])
def list_reservations(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return db.query(Reservation).order_by(Reservation.created_at.desc()).all()


@router.patch("/{reservation_id}/status", response_model=ReservationOut)
def update_reservation_status(
    reservation_id: int,
    payload: ReservationStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found",
        )

    reservation.status = payload.status
    db.commit()
    db.refresh(reservation)
    return reservation
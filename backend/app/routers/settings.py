from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import RestaurantSetting, User
from app.routers.auth import get_current_admin
from app.schemas.schemas import RestaurantSettingOut, RestaurantSettingUpdate

router = APIRouter()


def _get_or_create_setting(db: Session) -> RestaurantSetting:
    setting = db.query(RestaurantSetting).first()
    if not setting:
        setting = RestaurantSetting()
        db.add(setting)
        db.commit()
        db.refresh(setting)
    return setting


@router.get("/", response_model=RestaurantSettingOut)
def get_restaurant_settings(db: Session = Depends(get_db)):
    return _get_or_create_setting(db)


@router.put("/", response_model=RestaurantSettingOut)
def update_restaurant_settings(
    payload: RestaurantSettingUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    setting = _get_or_create_setting(db)
    for field, value in payload.model_dump().items():
        setattr(setting, field, value)

    db.commit()
    db.refresh(setting)
    return setting
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.models import Category, MenuItem, User
from app.routers.auth import get_current_admin
from app.schemas.schemas import MenuItemCreate, MenuItemOut, MenuItemUpdate

router = APIRouter()


def _serialize_menu_item(item: MenuItem) -> MenuItemOut:
    return MenuItemOut(
        id=item.id,
        category_id=item.category_id,
        category_name=item.category.name if item.category else None,
        name=item.name,
        description=item.description,
        price=item.price,
        image=item.image,
        is_featured=item.is_featured,
        is_popular=item.is_popular,
        is_available=item.is_available,
        created_at=item.created_at,
    )


@router.get("/", response_model=list[MenuItemOut])
def list_menu_items(
    category_id: Optional[int] = Query(default=None),
    featured_only: bool = Query(default=False),
    search: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(MenuItem).options(joinedload(MenuItem.category))

    if category_id is not None:
        query = query.filter(MenuItem.category_id == category_id)
    if featured_only:
        query = query.filter(MenuItem.is_featured.is_(True))
    if search and search.strip():
        term = f"%{search.strip()}%"
        query = query.filter(
            MenuItem.name.ilike(term) | MenuItem.description.ilike(term)
        )

    items = query.order_by(MenuItem.id.desc()).all()
    return [_serialize_menu_item(item) for item in items]


@router.post("/", response_model=MenuItemOut, status_code=status.HTTP_201_CREATED)
def create_menu_item(
    payload: MenuItemCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    category = db.query(Category).filter(Category.id == payload.category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Referenced category does not exist",
        )

    item = MenuItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    item.category = category
    return _serialize_menu_item(item)


@router.put("/{item_id}", response_model=MenuItemOut)
def update_menu_item(
    item_id: int,
    payload: MenuItemUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    item = (
        db.query(MenuItem)
        .options(joinedload(MenuItem.category))
        .filter(MenuItem.id == item_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu item not found")

    updates = payload.model_dump(exclude_unset=True)
    if "category_id" in updates:
        category = db.query(Category).filter(Category.id == updates["category_id"]).first()
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Referenced category does not exist",
            )
        item.category = category

    for field, value in updates.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return _serialize_menu_item(item)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_menu_item(
    item_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu item not found")

    db.delete(item)
    db.commit()
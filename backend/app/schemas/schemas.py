from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field


# --- Auth ---
class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    role: str


class AdminUserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    role: str


# --- Category ---
class CategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = ""
    image: str = "/images/starters.jpg"
    is_active: bool = True


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    description: Optional[str] = None
    image: Optional[str] = None
    is_active: Optional[bool] = None


class CategoryOut(CategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# --- Menu Item ---
class MenuItemBase(BaseModel):
    category_id: int
    name: str = Field(..., min_length=1, max_length=160)
    description: str = ""
    price: float = Field(..., gt=0)
    image: str = "/images/wagyu-steak.jpg"
    is_featured: bool = False
    is_popular: bool = False
    is_available: bool = True


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    category_id: Optional[int] = None
    name: Optional[str] = Field(default=None, min_length=1, max_length=160)
    description: Optional[str] = None
    price: Optional[float] = Field(default=None, gt=0)
    image: Optional[str] = None
    is_featured: Optional[bool] = None
    is_popular: Optional[bool] = None
    is_available: Optional[bool] = None


class MenuItemOut(MenuItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category_name: Optional[str] = None
    created_at: datetime


# --- Reservation ---
class ReservationCreate(BaseModel):
    customer_name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=40)
    booking_date: str = Field(..., min_length=4, max_length=30)
    booking_time: str = Field(..., min_length=3, max_length=30)
    guests: int = Field(..., ge=1, le=30)
    special_requests: str = ""


class ReservationStatusUpdate(BaseModel):
    status: Literal["Pending", "Confirmed", "Rejected"]


class ReservationOut(ReservationCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    created_at: datetime


# --- Contact Message ---
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: str = ""
    message: str = Field(..., min_length=1)


class ContactMessageOut(ContactMessageCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


# --- Restaurant Settings ---
class RestaurantSettingUpdate(BaseModel):
    restaurant_name: str = Field(..., min_length=1, max_length=120)
    phone: str = Field(..., min_length=3, max_length=40)
    email: EmailStr
    address: str = Field(..., min_length=3, max_length=255)
    opening_hours: str = Field(..., min_length=3, max_length=255)


class RestaurantSettingOut(RestaurantSettingUpdate):
    model_config = ConfigDict(from_attributes=True)

    id: int
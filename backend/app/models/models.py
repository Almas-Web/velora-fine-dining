from datetime import datetime, timezone
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship
from app.database import Base


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False, index=True)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(30), default="admin", nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text, default="", nullable=False)
    image = Column(String(300), default="/images/starters.jpg", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    menu_items = relationship(
        "MenuItem",
        back_populates="category",
        cascade="all, delete-orphan",
    )


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name = Column(String(160), nullable=False, index=True)
    description = Column(Text, default="", nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String(300), default="/images/wagyu-steak.jpg", nullable=False)
    is_featured = Column(Boolean, default=False, nullable=False)
    is_popular = Column(Boolean, default=False, nullable=False)
    is_available = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)

    category = relationship("Category", back_populates="menu_items")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(120), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    phone = Column(String(40), nullable=False)
    booking_date = Column(String(30), nullable=False)
    booking_time = Column(String(30), nullable=False)
    guests = Column(Integer, nullable=False)
    special_requests = Column(Text, default="", nullable=False)
    status = Column(String(30), default="Pending", nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    subject = Column(String(180), default="", nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)


class RestaurantSetting(Base):
    __tablename__ = "restaurant_settings"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_name = Column(String(120), default="VELORA", nullable=False)
    phone = Column(String(40), default="+1 (555) 234-8910", nullable=False)
    email = Column(String(150), default="concierge@veloradining.com", nullable=False)
    address = Column(
        String(255),
        default="42 Aurelia Avenue, Culinary District, NY 10013",
        nullable=False,
    )
    opening_hours = Column(
        String(255),
        default="Tue – Sun: 6:00 PM – 11:30 PM (Closed Mondays)",
        nullable=False,
    )
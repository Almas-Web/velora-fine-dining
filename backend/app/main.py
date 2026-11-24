from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.security import get_password_hash
from app.database import Base, SessionLocal, engine
from app.models.models import Category, MenuItem, RestaurantSetting, User
from app.routers import auth, categories, contact, menu, reservations, settings as settings_router


CURATED_MENU_ITEMS = [
    {
        "name": "Burrata & Heirloom Tomato Tartare",
        "description": "Creamy artisanal burrata paired with vine-ripened heirloom tomatoes, aged balsamic reduction, and fresh sweet basil.",
        "price": 18.0,
        "image": "/images/burrata-heirloom-tartare.jpg",
        "category_name": "Starters",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Pan-Seared Hokkaido Scallops",
        "description": "Caramelized Hokkaido sea scallops served over citrus butter emulsion with crisp microgreens.",
        "price": 26.0,
        "image": "/images/hokkaido-scallops.jpg",
        "category_name": "Seafood",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Chargrilled A5 Wagyu Ribeye",
        "description": "Japanese A5 Wagyu ribeye flame-seared to perfection, finished with roasted garlic herb butter and sea salt.",
        "price": 68.0,
        "image": "/images/wagyu-ribeye-steak.jpg",
        "category_name": "Main Courses",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Black Truffle Wild Mushroom Risotto",
        "description": "Slow-simmered carnaroli rice with wild forest mushrooms, aged parmesan crisp, and freshly shaved black truffle.",
        "price": 32.0,
        "image": "/images/truffle-mushroom-risotto.jpg",
        "category_name": "Main Courses",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Butter-Poached Atlantic Lobster Tail",
        "description": "Tender Atlantic lobster tail gently poached in cultured herb butter with delicate seasonal accompaniments.",
        "price": 54.0,
        "image": "/images/butter-poached-lobster.jpg",
        "category_name": "Seafood",
        "is_featured": True,
        "is_popular": False,
        "is_available": True,
    },
    {
        "name": "Duck Confit with Blackberry Glaze",
        "description": "Crispy-skinned slow-cooked duck leg glazed with rich blackberry reduction and warm savoury jus.",
        "price": 38.0,
        "image": "/images/duck-confit-blackberry.jpg",
        "category_name": "Main Courses",
        "is_featured": False,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Valrhona Dark Chocolate Soufflé",
        "description": "Warm risen Valrhona dark chocolate soufflé dusted with sugar, served alongside vanilla bean gelato.",
        "price": 16.0,
        "image": "/images/valrhona-chocolate-souffle.jpg",
        "category_name": "Desserts",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Smoked Rosemary Old Fashioned",
        "description": "Small-batch bourbon stirred with demerara and bitters, finished under aromatic charred rosemary smoke.",
        "price": 17.0,
        "image": "/images/smoked-rosemary-cocktail.jpg",
        "category_name": "Beverages",
        "is_featured": False,
        "is_popular": True,
        "is_available": True,
    },
]


def seed_initial_data() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        admin_user = (
            db.query(User)
            .filter(User.username == settings.ADMIN_DEFAULT_USERNAME)
            .first()
        )
        if not admin_user:
            db.add(
                User(
                    username=settings.ADMIN_DEFAULT_USERNAME,
                    email=settings.ADMIN_DEFAULT_EMAIL,
                    password_hash=get_password_hash(settings.ADMIN_DEFAULT_PASSWORD),
                    role="admin",
                )
            )

        default_categories_data = [
            {
                "name": "Starters",
                "description": "Delicate opening courses crafted to awaken the palate.",
                "image": "/images/burrata-heirloom-tartare.jpg",
                "is_active": True,
            },
            {
                "name": "Main Courses",
                "description": "Dry-aged cuts, roasted reductions, and wood-fired depth.",
                "image": "/images/wagyu-ribeye-steak.jpg",
                "is_active": True,
            },
            {
                "name": "Seafood",
                "description": "Wild-caught coastal delicacies plated with citrus and sea herbs.",
                "image": "/images/butter-poached-lobster.jpg",
                "is_active": True,
            },
            {
                "name": "Desserts",
                "description": "Sculptural pastry creations balancing cacao, fruit, and warmth.",
                "image": "/images/valrhona-chocolate-souffle.jpg",
                "is_active": True,
            },
            {
                "name": "Beverages",
                "description": "Cellar vintages, botanical infusions, and evening digestifs.",
                "image": "/images/smoked-rosemary-cocktail.jpg",
                "is_active": True,
            },
        ]

        category_by_name: dict[str, Category] = {}
        for cat_info in default_categories_data:
            existing_cat = (
                db.query(Category).filter(Category.name == cat_info["name"]).first()
            )
            if not existing_cat:
                existing_cat = Category(
                    name=cat_info["name"],
                    description=cat_info["description"],
                    image=cat_info["image"],
                    is_active=cat_info["is_active"],
                )
                db.add(existing_cat)
                db.flush()
            category_by_name[cat_info["name"]] = existing_cat

        for item_info in CURATED_MENU_ITEMS:
            existing_item = (
                db.query(MenuItem).filter(MenuItem.name == item_info["name"]).first()
            )
            category = category_by_name.get(item_info["category_name"])
            if not existing_item and category:
                db.add(
                    MenuItem(
                        category_id=category.id,
                        name=item_info["name"],
                        description=item_info["description"],
                        price=item_info["price"],
                        image=item_info["image"],
                        is_featured=item_info["is_featured"],
                        is_popular=item_info["is_popular"],
                        is_available=item_info["is_available"],
                    )
                )

        if db.query(RestaurantSetting).count() == 0:
            db.add(RestaurantSetting())

        db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(_: FastAPI):
    seed_initial_data()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok", "service": settings.PROJECT_NAME}


app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(reservations.router, prefix="/api/reservations", tags=["Reservations"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(settings_router.router, prefix="/api/settings", tags=["Settings"])
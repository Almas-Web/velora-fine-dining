from sqlalchemy.orm import Session
from app.models.models import Category, MenuItem


CURATED_CATEGORIES = [
    {
        "name": "Starters",
        "description": "Refined opening plates crafted to awaken the palate.",
        "image": "/images/burrata-heirloom-tartare.jpg",
        "is_active": True,
    },
    {
        "name": "Main Courses",
        "description": "Signature hearth and kitchen plates with bold depth.",
        "image": "/images/wagyu-ribeye-steak.jpg",
        "is_active": True,
    },
    {
        "name": "Seafood",
        "description": "Coastal delicacies prepared with delicate precision.",
        "image": "/images/butter-poached-lobster.jpg",
        "is_active": True,
    },
    {
        "name": "Desserts",
        "description": "Artisanal pastry finales to complete the evening.",
        "image": "/images/valrhona-chocolate-souffle.jpg",
        "is_active": True,
    },
    {
        "name": "Beverages",
        "description": "Bespoke cocktails and cellar pairings.",
        "image": "/images/smoked-rosemary-cocktail.jpg",
        "is_active": True,
    },
]

CURATED_MENU_ITEMS = [
    {
        "name": "Burrata & Heirloom Tomato Tartare",
        "description": "Creamy artisanal burrata paired with vine-ripened heirloom tomatoes, aged balsamic reduction, and fresh sweet basil.",
        "price": 18.00,
        "image": "/images/burrata-heirloom-tartare.jpg",
        "category_name": "Starters",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Pan-Seared Hokkaido Scallops",
        "description": "Caramelized Hokkaido sea scallops served over citrus butter emulsion with crisp microgreens.",
        "price": 26.00,
        "image": "/images/hokkaido-scallops.jpg",
        "category_name": "Seafood",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Chargrilled A5 Wagyu Ribeye",
        "description": "Japanese A5 Wagyu ribeye flame-seared to perfection, finished with roasted garlic herb butter and sea salt.",
        "price": 68.00,
        "image": "/images/wagyu-ribeye-steak.jpg",
        "category_name": "Main Courses",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Black Truffle Wild Mushroom Risotto",
        "description": "Slow-simmered carnaroli rice with wild forest mushrooms, aged parmesan crisp, and freshly shaved black truffle.",
        "price": 32.00,
        "image": "/images/truffle-mushroom-risotto.jpg",
        "category_name": "Main Courses",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Butter-Poached Atlantic Lobster Tail",
        "description": "Tender Atlantic lobster tail gently poached in cultured herb butter with delicate seasonal accompaniments.",
        "price": 54.00,
        "image": "/images/butter-poached-lobster.jpg",
        "category_name": "Seafood",
        "is_featured": True,
        "is_popular": False,
        "is_available": True,
    },
    {
        "name": "Duck Confit with Blackberry Glaze",
        "description": "Crispy-skinned slow-cooked duck leg glazed with rich blackberry reduction and warm savoury jus.",
        "price": 38.00,
        "image": "/images/duck-confit-blackberry.jpg",
        "category_name": "Main Courses",
        "is_featured": False,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Valrhona Dark Chocolate Soufflé",
        "description": "Warm risen Valrhona dark chocolate soufflé dusted with sugar, served alongside vanilla bean gelato.",
        "price": 16.00,
        "image": "/images/valrhona-chocolate-souffle.jpg",
        "category_name": "Desserts",
        "is_featured": True,
        "is_popular": True,
        "is_available": True,
    },
    {
        "name": "Smoked Rosemary Old Fashioned",
        "description": "Small-batch bourbon stirred with demerara and bitters, finished under aromatic charred rosemary smoke.",
        "price": 17.00,
        "image": "/images/smoked-rosemary-cocktail.jpg",
        "category_name": "Beverages",
        "is_featured": False,
        "is_popular": True,
        "is_available": True,
    },
]


def seed_menu_data(db: Session) -> None:
    category_map: dict[str, Category] = {}

    for cat_data in CURATED_CATEGORIES:
        existing_cat = db.query(Category).filter(Category.name == cat_data["name"]).first()
        if not existing_cat:
            existing_cat = Category(
                name=cat_data["name"],
                description=cat_data["description"],
                image=cat_data["image"],
                is_active=cat_data["is_active"],
            )
            db.add(existing_cat)
            db.flush()
        category_map[cat_data["name"]] = existing_cat

    for item_data in CURATED_MENU_ITEMS:
        existing_item = db.query(MenuItem).filter(MenuItem.name == item_data["name"]).first()
        category = category_map[item_data["category_name"]]

        if not existing_item:
            new_item = MenuItem(
                name=item_data["name"],
                description=item_data["description"],
                price=item_data["price"],
                image=item_data["image"],
                category_id=category.id,
                is_featured=item_data["is_featured"],
                is_popular=item_data["is_popular"],
                is_available=item_data["is_available"],
            )
            db.add(new_item)

    db.commit()
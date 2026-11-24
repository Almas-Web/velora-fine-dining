# VELORA — Fine Dining & Table Reservations

An architectural fine-dining restaurant platform crafted around quiet luxury, seasonal tasting menus, and evening table reservations. Built with an obsidian dark canvas (`#111111` / `#0C0C0C`), warm ivory editorial typography (`#F4EFE5`), and brushed gold accents (`#C6A66B`).

## Highlights

- **Pure Fine-Dining Experience:** Focused on menu exploration, evening table reservations, guest reflections, and restaurant inquiries without online takeout carts.
- **Editorial Landing Experience:** Hero showcase, philosophy & story section (`07` seasonal tasting chapters, `100%` house-crafted stocks & jus, `38` intimate seats per evening), signature dishes, evening selections, chef's special, gallery preview, and reservation call-to-action.
- **Mobile-First Responsiveness:** Touch-friendly controls, responsive typography and spacing, safe mobile animations, and zero horizontal overflow.
- **Full-Stack Architecture:** Next.js frontend paired with a FastAPI backend and Neon PostgreSQL database.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Framer Motion, GSAP (`ScrollTrigger`), Lucide Icons
- **Backend:** FastAPI, Python
- **Database:** Neon PostgreSQL
- **Deployment:** Vercel (Frontend) & Render / Railway (Backend)

## Project Structure

velora-fine-dining/
├── backend/                 # FastAPI application, models, schemas & API routes
├── frontend/                # Next.js App Router application
│   ├── public/images/       # Curated dish, chef special, gallery & banner images
│   └── src/
│       ├── app/             # Home, /menu, /reservation, /about, /gallery, /contact, /admin
│       ├── components/      # Navbar, Footer, PageLoader & home sections
│       └── lib/             # API helpers, mock data & utilities
└── README.md

## Local Setup

### 1. Backend (FastAPI + Neon PostgreSQL)

cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

pip install -r requirements.txt

Create a `.env` file inside `backend/`:

DATABASE_URL=your_neon_postgresql_connection_string

Run the development server:

uvicorn main:app --reload

### 2. Frontend (Next.js)

cd frontend
npm install

Create a `.env.local` file inside `frontend/`:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

Run the development server:

npm run dev

Open `http://localhost:3000` in your browser.

## Deployment

- **Frontend (Vercel):** Import the GitHub repository, set the root directory to `frontend` (if using a monorepo), and configure `NEXT_PUBLIC_API_URL` in environment variables.
- **Backend (Render / Railway):** Deploy the backend service with `DATABASE_URL` configured and CORS enabled for the live Vercel domain.
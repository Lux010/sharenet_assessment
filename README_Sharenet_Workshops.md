# Sharenet Workshops & Spot Prices Dashboard

A full‑stack web application that displays financial spot prices, allows
users to view workshop venues, and book workshop dates online. Bookings
are stored in a MySQL database and seat availability is tracked in real
time.

---

## Features

- Spot prices dashboard grouped by category
- Contact page
- Workshop venues listing
- Booking system with user details
- Seat availability tracking (atomic updates)
- Recent bookings page
- Toast notifications and loading skeletons
- Responsive user interface

---

## Tech Stack

### Frontend

- Vue 3
- Vite
- Axios
- Custom CSS

### Backend

- Node.js
- Express.js
- MySQL (mysql2)

### Database

- MySQL relational schema for workshops and bookings

---

## Project Structure

    project-root/
    │
    ├── frontend/
    │   ├── src/
    │   ├── components/
    │   ├── views/
    │   └── api/
    │
    ├── backend/
    │   ├── routes/
    │   ├── db.js
    │   └── server.js
    │
    └── README.md

---

## Getting Started

### 1. Clone the repository

    git clone <your-repository-url>
    cd project-root

---

### 2. Setup Backend

    cd backend
    npm install
    npm run dev

Backend runs at:

    http://localhost:3000

---

### 3. Setup Frontend

Open a new terminal:

    cd frontend
    npm install
    npm run dev

Frontend runs at:

    http://localhost:5173

Production-Ready runs at:

    https://ample-reprieve-production.up.railway.app/

---

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE sharenet_workshops;
```

Tables used: - workshop_dates - bookings

Run your schema and seed scripts before starting the backend.

---

## Environment Variables

Create a `.env` file inside the backend folder:

    DB_HOST=localhost
    DB_USER=workshop_user
    DB_PASSWORD=@Sharenet123
    DB_NAME=sharenet_workshops
    DB_PORT=3306

---

## API Endpoints

### Workshops

    GET /api/workshops

Returns venues and workshop dates.

### Bookings

    POST /api/bookings
    GET /api/bookings

Creates a booking and retrieves recent bookings.

---

## Author

Luxolo Ndima\
Full‑Stack Developer

---

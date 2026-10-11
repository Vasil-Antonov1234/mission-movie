# 🎬 Mission Movie

A full-stack movie blog application where cinephiles can track films, write reviews, and connect with other movie lovers.

**Live Demo:** [mission-movie.vercel.app](https://mission-movie.vercel.app)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
---

## About

Mission Movie is a full-stack web application built as a portfolio project. It allows users to browse movies, write reviews, manage cast members, and interact with the community. The project demonstrates real-world concepts such as JWT authentication, Google OAuth, role-based access control, file uploads, and email integration.

---

## Features

- 🔐 **Authentication** — Register and login with email/password or Google OAuth
- 🎬 **Movies** — Browse, search, create and manage movies
- ⭐ **Reviews** — Write, edit and delete movie reviews with ratings
- 🎭 **Cast** — Add and manage cast members with detailed actor profiles
- 👤 **User Profiles** — Edit profile, upload avatar, change password
- 🔑 **Forgot Password** — Password reset flow via email
- 🛡️ **Admin Panel** — Admin role with full access to manage users and content
- 🖼️ **Image Upload** — Upload movie posters and user's avatars to Supabase Storage
- 🔍 **Search** — Search movies, cast members, director and users
- 📱 **Responsive Design** — Fully responsive across all screen sizes

---

## Tech Stack

### Frontend
- **React.js** with **TypeScript**
- **React Router** — client-side routing
- **CSS Modules** — scoped component styles
- **Vite** — build tool

### Backend
- **Node.js** with **Express.js**
- **Prisma ORM** — database access
- **PostgreSQL** — relational database
- **JWT** — authentication and session management
- **Passport.js** — Google OAuth 2.0
- **Bcrypt** — password hashing
- **Zod** — schema validation
- **Multer** — file upload handling
- **Nodemailer + Resend** — email delivery
- **Supabase Storage** — file storage

### Infrastructure
- **Vercel** — frontend hosting
- **Render** — backend hosting
- **Supabase** — PostgreSQL database and file storage

---

## Project Structure

```
mission-movie/
├── app/                    # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # All React components
|       |   ├── 404/
│       │   ├── about/
│       │   ├── admin/
│       │   ├── buttons/
│       │   ├── cast/
│       │   ├── catalog/
│       │   ├── comments/
│       │   ├── create/
│       │   ├── detail/
│       │   ├── footer/
│       │   ├── header/
│       │   ├── footer/
│       │   ├── hero/
│       │   ├── home/
│       │   ├── loading/
│       │   ├── login-register/
│       │   ├── pagination/
│       │   ├── policy/
│       │   ├── reviews/
│       │   ├── route-guards/
│       │   ├── scroll-to-top/
│       │   ├── search/
│       │   ├── trailer-modal/
│       │   ├── trending/
│       │   └── user/
│       ├── contexts/       # React context providers
│       ├── hooks/          # Custom hooks
│       ├── types/          # TypeScript types
│       ├── utils/          # Util functions
│       ├── App.tsx
│       └── main.tsx
│
└── api/                    # Node.js backend
    ├── prisma/
    |   ├── migrations/
    │   └── schema.prisma
    └── src/
        ├── config/         # Passport, Supabase, Resend config
        ├── controllers/    # Nested routes
        ├── lib/            
        ├── middlewares/    # Auth and admin middleware
        ├── repositories/   # Repository layer
        ├── schemas/        # ZOD schemas
        ├── services/       # Service layer
        ├── utils/          # Util functions
        ├── routes.js       # Express routes
        └── index.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database (or Supabase account)

### Clone the repository

```bash
git clone https://github.com/Vasil-Antonov1234/mission-movie.git
cd mission-movie
```

### Install dependencies

```bash
# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../app
npm install
```

### Set up the database

```bash
cd api
npx prisma migrate dev
```

### Run the development servers

```bash
# Run backend (from /api folder)
npm run dev

# Run frontend (from /app folder)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## Environment Variables

### Backend (`/api/.env`)

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

### Frontend (`/app/.env`)

```env
VITE_API_URL=http://localhost:5000
```

---

## Screenshots

> Screenshots coming soon.

---

## Author

**Vasil Antonov**
- GitHub: [@Vasil-Antonov1234](https://github.com/Vasil-Antonov1234)
- LinkedIn: [Vasil Antonov](https://linkedin.com/in/vasil-antonov-217182301)

---

*Built as a portfolio project to demonstrate full-stack web development skills.*

# mfelinto.com — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A full-stack personal portfolio with a **retro Windows 2000 desktop interface**, featuring draggable windows, a content management admin panel, and a contact form with rate limiting.

**Live:** [mfelinto.com](https://www.mfelinto.com)

---

## Overview

The portfolio presents itself as a classic desktop environment — visitors interact with draggable windows to browse projects, work experience, achievements, and blog posts. All content is managed through a secure, authenticated admin dashboard.

---

## Features

### Public Portfolio
- Retro Windows 2000–inspired desktop UI with draggable, resizable windows
- **About Me** — bio, avatar, and social links (GitHub, LinkedIn)
- **Projects** — portfolio projects with descriptions, technologies used, and links
- **Experience** — work history with company, role, and dates
- **Achievements** — categorized certificates and milestones
- **Blog** — published blog posts
- **Contact Form** — email submission with IP-based rate limiting

### Admin Dashboard (`/admin`)
- Authenticated admin panel (Google OAuth + email/password credentials)
- Full CRUD for all content: profile, projects, experience, achievements, blog posts
- Blog post draft/publish workflow

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |
| Database | PostgreSQL via [Neon](https://neon.tech) (serverless) |
| ORM | Prisma 7 |
| Auth | NextAuth.js v5 (Google OAuth + Credentials) |
| Forms | React Hook Form + Zod |
| State | TanStack React Query v5 |
| Email | Nodemailer |
| Windows UI | react-rnd |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                   # Main portfolio page
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth route
│   │   └── contact/               # Contact form endpoint
│   └── admin/                     # Protected admin dashboard
│       ├── login/
│       └── (dashboard)/
│           ├── profile/
│           ├── projects/
│           ├── experience/
│           ├── achievements/
│           └── posts/
├── components/
│   ├── desktop/                   # Desktop UI (windows, taskbar, icons)
│   │   └── windows/               # Window content components
│   └── admin/                     # Admin UI components
└── lib/
    ├── auth.ts                    # NextAuth configuration
    ├── prisma.ts                  # Prisma client
    ├── types.ts                   # Shared TypeScript types
    └── actions/                   # Next.js Server Actions
prisma/
├── schema.prisma
├── seed.ts
└── migrations/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g., [Neon](https://neon.tech) free tier)
- Google OAuth credentials (for admin login)
- An SMTP server (for the contact form)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Velinu/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in the values in .env (see Environment Variables section)

# 4. Run database migrations
npx prisma migrate deploy

# 5. Seed the database with initial data
npm run db:seed

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file at the project root with the following variables:

```env
# PostgreSQL (Neon or any PostgreSQL provider)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_secret"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# SMTP (for contact form)
SMTP_HOST="your_smtp_host"
SMTP_PORT="587"
SMTP_USER="your_smtp_user"
SMTP_PASS="your_smtp_password"
SMTP_FROM="your_email@example.com"
```

> Generate `NEXTAUTH_SECRET` with: `openssl rand -base64 32`

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed the database with initial data |

---

## Admin Access

Navigate to `/admin/login` to access the admin dashboard. Authentication is handled via:
- **Google OAuth** — restricted to allowed email addresses configured in `src/lib/auth.ts`
- **Credentials** — email/password login (seeded via `prisma/seed.ts`)

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

Built by [Matheus Felinto da Silva](https://github.com/Velinu)

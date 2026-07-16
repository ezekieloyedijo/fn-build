# FNBUILD & Construction

A premium, full-stack construction company website with a complete CMS admin dashboard, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma, PostgreSQL, and NextAuth.

## Features

- **Public website**: animated hero carousel, about/stats, services, filterable project portfolio with detail pages, masonry gallery with lightbox, testimonial slider, FAQ accordion, and a validated contact form with email notifications.
- **Admin dashboard** (`/admin`): full CRUD for Projects, Services, Testimonials, Gallery, and FAQs, plus an Enquiries inbox — all protected behind NextAuth credentials login.
- **Image uploads**: use Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set (production), falling back to local disk under `public/uploads` for local dev.
- Dark/light theme, scroll progress bar, scroll-triggered animations, SEO metadata, sitemap, and robots.txt.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in:
- `DATABASE_URL` — a PostgreSQL connection string
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for the first admin user (used by the seed script)
- `SMTP_*` — optional, for contact form email notifications
- `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_PHONE_NUMBER` — used by the floating WhatsApp/Call buttons

### 3. Set up the database

```bash
npm run prisma:migrate
npm run seed
```

This creates all tables and seeds an admin user plus sample services, FAQs, testimonials, and a project.

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/login` to sign in to the admin dashboard with the credentials from your `.env`.

## Production Build

```bash
npm run build
npm start
```

## Deploying to Vercel

1. **Push to GitHub** and import the repo in the [Vercel dashboard](https://vercel.com/new).
2. **Database**: provision a Postgres instance (e.g. [Neon](https://neon.tech)) and copy its connection string.
3. **Blob storage**: in the Vercel project → Storage tab, create a Blob store and connect it to the project — this auto-injects `BLOB_READ_WRITE_TOKEN`.
4. **Environment variables** (Project Settings → Environment Variables): set `DATABASE_URL`, `NEXTAUTH_URL` (your production domain, e.g. `https://fnbuild.vercel.app`), `NEXTAUTH_SECRET`, `SMTP_*`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`.
5. **Deploy** — Vercel runs `prisma generate && next build` automatically per `package.json`.
6. **Apply migrations** once, from your machine, pointed at the production database:
   ```bash
   DATABASE_URL="<production-connection-string>" npm run prisma:deploy
   ```
7. **Seed the admin user** (and optional demo content) the same way:
   ```bash
   DATABASE_URL="<production-connection-string>" npm run seed
   ```
8. Visit the deployed URL and confirm `/login` and an admin image upload both work.

To inspect production data at any time, point your local `.env` at the production `DATABASE_URL` and run `npm run prisma:studio`.

## Notes

- `next-auth@4` has a transitive dependency on an older `uuid` range with a known low-severity advisory; upgrading requires a major NextAuth version bump (Auth.js v5) which changes its API surface — evaluate that migration separately before production launch.

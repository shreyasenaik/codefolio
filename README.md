# CodeFolio — Developer Portfolio Builder CMS

> A production-grade, full-stack MERN portfolio builder CMS designed specifically for software engineers. Users configure their profile, projects, and skills through an interactive split-screen dashboard, and their data gets dynamically injected into swappable portfolio templates published at a vanity URL (`/:username`).

---

## 🏗️ Architecture & Decoupling

CodeFolio implements a strict monorepo architecture with clean separation of concerns:

```text
codefolio/
├── client/
│   ├── src/
│   │   ├── dashboard/          # PRIVATE CMS components (NEVER imported by /portfolio)
│   │   ├── portfolio/          # PUBLIC-FACING portfolio rendering (NEVER imported by /dashboard)
│   │   ├── templates/          # Swappable templates (Minimalist, Cyberpunk)
│   │   │   ├── Minimalist/
│   │   │   ├── Cyberpunk/
│   │   │   ├── DefaultLayout.jsx
│   │   │   └── templateMap.js  # Template Engine registry (Open-Closed Principle)
│   │   ├── api/                # Axios service layer with JWT interceptors
│   │   ├── context/            # AuthContext & LivePreviewContext
│   │   ├── routes/             # AppRoutes & ProtectedRoute
│   │   ├── hooks/
│   │   └── shared/
├── server/
│   ├── config/                 # db.js (Mongoose with auto-fallback to in-memory MongoDB)
│   ├── models/                 # User, Project, Skill Mongoose schemas
│   ├── controllers/            # Auth, Profile, Projects, Skills, Public Vanity, Contact
│   ├── routes/                 # Express API sub-routers
│   ├── middleware/             # authMiddleware (JWT), errorMiddleware
│   ├── services/               # mailService (Nodemailer), seedService (demo data)
│   └── server.js               # Main Express entrypoint
```

---

## 🎨 Template Engine Pattern

Instead of complex `if/else` or `switch` statements, CodeFolio uses a **Declarative Template Registry Pattern** in `client/src/templates/templateMap.js`:

```javascript
export const templateMap = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate
};

export const getTemplateComponent = (templateId) => {
  return templateMap[templateId] || DefaultLayout;
};
```

This adheres to the **Open-Closed Principle (SOLID)** — adding a new template only requires adding one entry to `templateMap`, without touching any routing or CMS logic.

---

## 🌐 Routing & Vanity URL Decision

- **Frontend Route**: `/:username` renders `PublicPortfolioPage`, extracting the `username` parameter via `useParams()`.
- **Backend Endpoint**: `GET /api/users/:username` performs an aggregate lookup across `User`, `Project`, and `Skill` collections in MongoDB and returns a clean, sanitized JSON payload without exposing sensitive fields (`email`, `passwordHash`).
- **Nodemailer Gateway**: Messages submitted through the contact form are dispatched to the developer's registered email via backend server-side proxying (`POST /api/contact/:username`), preventing email scraping and spam.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# In the root folder:
npm run install:all
```

### 2. Run Development Server
```bash
# Runs backend API (port 5000) and frontend Vite dev server (port 5173) concurrently:
npm run dev
```

### 3. Demo Accounts
The database automatically seeds two rich demo accounts on first run:
- **Demo 1 (Minimalist)**: `http://localhost:5173/demo1` (Credentials: `alex.rivera@example.com` / `password123`)
- **Demo 2 (Cyberpunk)**: `http://localhost:5173/demo2` (Credentials: `vex.thorne@cyberpunk.io` / `password123`)

---

## 🧪 Tech Stack
- **Frontend**: React 18, Vite, React Router v7, React Hook Form, React Helmet Async, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB & Mongoose (with automated in-memory MongoDB fallback for zero-config testing)
- **Email**: Nodemailer (with automated Ethereal dev accounts)
- **Authentication**: JWT & bcryptjs

# CodeFolio — System Design & Architecture Note

> **Author / Intern Defense Document**  
> **Topic**: Routing Decisions, Template Engine Pattern, and Decoupled MERN Architecture for Multi-Tenant Portfolio CMS

---

## 1. Executive Summary & Problem Formulation

CodeFolio is a specialized developer portfolio CMS that allows software engineers to configure their profiles, projects, and skills via an administrative CMS dashboard, rendering dynamic portfolios at vanity URLs like `codefolio.com/:username` across swappable aesthetic templates.

Designing this system requires solving four core architectural requirements:
1. **Dynamic Extensibility**: Templates must be swappable and extensible without rewriting routing logic or polluting core layout files.
2. **Zero Leaks & Bundle Decoupling**: Administrative CMS libraries (forms, editors, authentication contexts) must never bleed into public visitor pages, ensuring rapid sub-second First Contentful Paint (FCP).
3. **Vanity URL Aggregation**: A single public endpoint must aggregate multi-collection data (User, Project, Skill) with zero sensitive data leakage (passwords, emails).
4. **Secure Communication Gateway**: Visitors must be able to message developers directly without exposing the developer's registered email in public client code or API responses.

---

## 2. Architectural Design Decision: The Template Engine Pattern

### Anti-Pattern: Procedural `if/else` or `switch` Chains
A naive implementation selects layouts using conditional branching:
```jsx
// ❌ ANTI-PATTERN: Violates Open-Closed Principle
if (user.templateId === 'minimalist') {
  return <MinimalistTemplate data={data} />;
} else if (user.templateId === 'cyberpunk') {
  return <CyberpunkTemplate data={data} />;
} else {
  return <DefaultLayout data={data} />;
}
```
*Why this fails in production*:
- Every new template requires modifying core routing and container components.
- Violates the **Open-Closed Principle (SOLID)** — modules should be open for extension but closed for modification.
- High risk of merge conflicts and regression in production.

### Production Solution: Declarative Template Registry (`templateMap`)
CodeFolio implements a dictionary lookup registry pattern (`client/src/templates/templateMap.js`):

```javascript
import MinimalistTemplate from './Minimalist/MinimalistTemplate.jsx';
import CyberpunkTemplate from './Cyberpunk/CyberpunkTemplate.jsx';
import DefaultLayout from './DefaultLayout.jsx';

export const templateMap = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate
};

export const getTemplateComponent = (templateId) => {
  if (!templateId || typeof templateId !== 'string') {
    return DefaultLayout;
  }
  const normalizedId = templateId.toLowerCase().trim();
  return templateMap[normalizedId] || DefaultLayout;
};
```

#### Key Advantages:
1. **$O(1)$ Dynamic Resolution**: Constant-time component resolution by template key.
2. **Strict Component Contract**: Every registered template adheres to the identical data prop interface:
   $$\text{TemplateComponent}(\{ \text{data}: \{ \text{user}, \text{projects}, \text{skills} \}, \text{isPreview}: \text{boolean} \})$$
3. **Graceful Fallback**: Unknown or deprecated template IDs safely fallback to `DefaultLayout` without unhandled rendering exceptions.

---

## 3. Architectural Design Decision: Vanity URL Routing & Data Fetching

```
  [ Client Browser ]
          │
          ▼ GET /:username (React Router dynamic route)
  [ PublicPortfolioPage ]
          │
          ▼ GET /api/users/:username (Single unified API request)
  [ Express Backend / publicController ]
          │
          ├─► User.findOne({ username }).select('public fields only')
          │
          └─► Promise.all([
                Project.find({ userId }).sort({ featured: -1, order: 1 }),
                Skill.find({ userId }).sort({ category: 1, order: 1 })
              ])
          │
          ▼ 200 OK (Sanitized JSON payload)
  [ Template Engine: templateMap[templateId] ] ──► Dynamic DOM Render
```

### Why Backend-Driven Dynamic Routing?
- **Separation of Concerns**: The frontend route `/:username` remains a lightweight container that delegates all business logic, authorization filtering, and data aggregation to the backend.
- **Single Round-Trip Time (RTT)**: Instead of the browser firing 3 sequential requests (`/api/users/profile`, `/api/users/projects`, `/api/users/skills`), the backend performs parallel database lookups concurrently via `Promise.all` and returns a consolidated payload in a single roundtrip.
- **Projection Whitelisting**: The backend query explicitly selects only public fields:
  ```javascript
  User.findOne({ username }).select('name username title bio avatarUrl resumeUrl socialLinks templateId isPro customDomain createdAt');
  ```
  `passwordHash` (configured with `select: false`) and `email` are never serialized to the wire.

---

## 4. Decoupling & Security Boundaries

### A. Strict Module Boundary
- Public portfolio components (`/client/src/portfolio`) **NEVER** import from CMS dashboard modules (`/client/src/dashboard`).
- Administrative form validation packages (`react-hook-form`), dashboard layouts, and state stores are only loaded when an authenticated developer accesses `/dashboard`.

### B. Secure Contact Form Proxying
- When a recruiter or visitor contacts a developer, the request is sent to `POST /api/contact/:username`.
- The backend retrieves the developer's private email internally from the database (`.select('+email')`) and dispatches the message via Nodemailer without exposing the recipient's address to the client.

---

## 5. Summary Table for Evaluation

| Architectural Concern | Traditional / Naive Approach | CodeFolio Engineered Approach |
|---|---|---|
| **Template Selection** | Nested `if/else` or `switch` statements | Declarative `templateMap` dictionary lookup with `DefaultLayout` fallback (Open-Closed Principle) |
| **Vanity URL Fetching** | Multiple client-side REST calls for user, projects, and skills | Single `GET /api/users/:username` aggregate endpoint utilizing `Promise.all` concurrency |
| **Email Privacy** | Exposing `mailto:user@domain.com` in HTML or API | Server-side Nodemailer gateway (`POST /api/contact/:username`) preventing email scraping |
| **CMS vs Public Code** | Single monolithic bundle mixing forms and public views | Strictly decoupled module folders (`/dashboard` vs `/portfolio`) with isolated dependencies |
| **Database Resiliency** | Hard crash if MongoDB daemon is not running locally | Automatic in-memory MongoDB fallback with pre-seeded demo accounts |

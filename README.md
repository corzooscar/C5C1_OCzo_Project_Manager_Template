# ProjectManager SPA

> A single-page application for internal project management with role-based access control, session persistence, and a simulated REST API via json-server.

---

## Description

ProjectManager is a lightweight SPA built with **Vanilla JavaScript + Vite** and **pure CSS**. It allows a company to manage internal projects with two user roles: **Manager** (full CRUD) and **Collaborator** (view assigned projects, update status only). Authentication is validated against a json-server database, and session data persists in `localStorage`.

---

## Technologies

| Tool | Purpose |
|---|---|
| Vite | Dev server & bundler |
| Vanilla JavaScript (ES Modules) | SPA logic, DOM, routing |
| Fetch API | HTTP calls to json-server |
| json-server | Simulated REST API |
| localStorage | Session persistence |
| Pure CSS | Styling & responsive layout |

---

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd project-manager

# 2. Install dependencies
npm install
```

---

## Running the Project

Open **two terminals** simultaneously:

**Terminal 1 — JSON Server (API)**
```bash
npm run server
# Runs on http://localhost:3000
```

**Terminal 2 — Vite Dev Server (App)**
```bash
npm run dev
# Runs on http://localhost:5173
```

Then open your browser at `http://localhost:5173`.

---

## Running JSON Server

```bash
npm run server
```

This watches `db.json` and exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Get all users |
| GET | `/users?email=&password=` | Validate credentials |
| GET | `/projects` | Get all projects |
| GET | `/projects?assignedTo=:id` | Get projects by user |
| POST | `/projects` | Create a project |
| PATCH | `/projects/:id` | Update a project |
| DELETE | `/projects/:id` | Delete a project |

---

## Test Users

| Role | Email | Password |
|---|---|---|
| Manager | manager@test.com | 123456 |
| Collaborator | user@test.com | 123456 |
| Collaborator | sofia@test.com | 123456 |

---

## Project Structure

```
project-manager/
├── index.html              # SPA shell (single HTML file)
├── db.json                 # json-server database
├── package.json
├── vite.config.js
└── assets/
    ├── css/
    │   └── styles.css      # All styles (pure CSS, variables, responsive)
    └── js/
        ├── app.js          # Entry point: navbar, router, global events
        ├── router.js       # SPA router with role-based guards
        ├── components/
        │   ├── navbar.js       # Dynamic navbar (renders by session)
        │   └── projectModal.js # Reusable create/edit modal
        ├── middleware/
        │   └── authMiddleware.js  # guardRoute() — auth + role check
        ├── pages/
        │   ├── loginView.js       # Login page & credential validation
        │   ├── managerView.js     # Manager dashboard: full CRUD + stats
        │   └── collaboratorView.js# Collaborator dashboard: view + update status
        ├── services/
        │   └── api.js         # All fetch() calls to json-server
        └── utils/
            ├── session.js     # setSession, getSession, clearSession
            └── helpers.js     # getStatusClass, formatDate, showToast, today
```

---

## Role Permissions

| Action | Manager | Collaborator |
|---|---|---|
| View all projects | ✅ | ❌ |
| View assigned projects | ✅ | ✅ |
| Create projects | ✅ | ❌ |
| Edit projects | ✅ | ❌ |
| Delete projects | ✅ | ❌ |
| Update status (own projects) | ✅ | ✅ |
| Access /dashboard | ✅ | ❌ (redirect) |
| Access /my-projects | ❌ (redirect) | ✅ |

---

## Technical Decisions

### 1. Single `db.json` (one json-server instance)
Both users and projects live in one file on port 3000. This simplifies setup — only one terminal for the API instead of two.

### 2. Fetch API over Axios
Using the native `fetch()` directly to keep zero runtime dependencies. A thin `http()` wrapper in `api.js` handles method, headers, body, and error checking in one place.

### 3. `localStorage` for session persistence
`localStorage` was chosen over `sessionStorage` so the session survives browser restarts. The session is cleared explicitly on logout via `clearSession()`.

### 4. Hash-free SPA routing via History API
`history.pushState()` + `popstate` listener gives clean URLs (`/dashboard`, `/my-projects`) without a `#` prefix. Vite handles the dev server rewrite automatically.

### 5. Role guard at two layers
- **Router level** (`router.js`): redirects immediately if the URL doesn't match the user's role.
- **Page level** (`authMiddleware.js` → `guardRoute()`): each page independently verifies the session, so direct URL access is also blocked.

### 6. Event delegation for dynamic content
Instead of attaching listeners to every button in a list, one listener on the parent container catches edit/delete/save clicks via `closest()`. This avoids memory leaks when the table is re-rendered.

### 7. Pure CSS with custom properties
No CSS framework — just CSS variables for colors, spacing, and shadows. This keeps the bundle tiny and makes theming straightforward by editing `:root`.

---

## Step-by-Step Build Guide

This section explains exactly how this project was built, in order. Use it as a template for similar SPA challenges.

---

### Step 1 — Project Setup

```bash
mkdir project-manager && cd project-manager
npm init -y
npm install -D vite json-server
```

Create `vite.config.js`:
```js
import { defineConfig } from 'vite';
export default defineConfig({ server: { port: 5173, open: true } });
```

Add scripts to `package.json`:
```json
"scripts": {
  "dev": "vite",
  "server": "json-server --watch db.json --port 3000"
}
```

**Why first?** Vite gives us ES module support, hot reload, and a clean dev experience. json-server replaces a real backend with zero config.

---

### Step 2 — Database (`db.json`)

Define your data shape before writing any JS. Think about what fields each entity needs:

```json
{
  "users":    [{ "id", "name", "email", "password", "role" }],
  "projects": [{ "id", "name", "description", "status", "createdAt", "assignedTo" }]
}
```

Pre-load at least one manager and two collaborators. Add sample projects with `assignedTo` pointing to collaborator IDs.

**Why?** json-server reads this file and instantly gives you a full REST API. No backend code needed.

---

### Step 3 — HTML Shell (`index.html`)

The SPA only needs one HTML file:

```html
<div id="app">
  <header id="navbar"></header>
  <main id="content" class="container"></main>
</div>
<div id="toast-container"></div>
<script type="module" src="/assets/js/app.js"></script>
```

`#navbar` and `#content` are the only mount points. JavaScript writes everything else into them.

**Why?** A true SPA never navigates to a new HTML page. All views are injected into `#content` dynamically.

---

### Step 4 — CSS (`assets/css/styles.css`)

Write styles using CSS custom properties (variables):

```css
:root {
  --color-primary: #4f46e5;
  --color-bg: #f8fafc;
  /* ... */
}
```

Design the components you know you'll need:
- `.navbar`, `.btn`, `.card`, `.form-group`, `.alert`
- `.stat-card`, `.table-wrapper`, `.status-badge`
- `.modal-backdrop`, `.login-box`, `.toast`
- Media queries for mobile (`max-width: 600px`)

**Why CSS variables?** They make the whole design consistent and easy to change in one place.

---

### Step 5 — Session Utility (`utils/session.js`)

Three functions, that's it:

```js
setSession(user)   // → localStorage.setItem(...)
getSession()       // → JSON.parse(localStorage.getItem(...)) | null
clearSession()     // → localStorage.removeItem(...)
```

**Why a utility?** Every page and the router needs to check the session. Centralizing avoids repeating the key name and parsing logic.

---

### Step 6 — API Service (`services/api.js`)

Write one `http(method, endpoint, body)` function that wraps `fetch()`:

```js
async function http(method, endpoint, body = null) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { method, headers, body });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (method === 'DELETE') return null;
  return res.json();
}
```

Then export one function per operation:
- `login(email, password)` → GET `/users?email=&password=`
- `getProjects()` → GET `/projects`
- `createProject(data)` → POST `/projects`
- `updateProject(id, data)` → PATCH `/projects/:id`
- `deleteProject(id)` → DELETE `/projects/:id`

**Why a service layer?** Views shouldn't know about URLs or HTTP. If the API changes, you only update one file.

---

### Step 7 — Auth Middleware (`middleware/authMiddleware.js`)

```js
export function guardRoute(requiredRole = null) {
  const session = getSession();
  if (!session) return 'unauthenticated';
  if (requiredRole && session.role !== requiredRole) return 'unauthorized';
  return 'ok';
}
```

Each page calls this at the top of its render function and handles each case.

**Why?** Separating the guard logic from routing allows each view to decide what to show when access is denied (error message vs. redirect).

---

### Step 8 — Router (`router.js`)

The router maps URL paths to render functions and enforces role-based access:

```js
const routes = {
  '/login':       renderLogin,
  '/dashboard':   renderManager,
  '/my-projects': renderCollaborator,
};

export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

export async function router() {
  const path = window.location.pathname;
  const session = getSession();
  // 1. Public routes: if logged in, redirect to dashboard
  // 2. Protected routes: if not logged in, go to /login
  // 3. Role check: /dashboard only for manager, /my-projects only for collaborator
  // 4. Call the render function
}
```

**Why History API?** `pushState` changes the URL without a page reload. The `popstate` listener handles the browser's back/forward buttons.

---

### Step 9 — Navbar Component (`components/navbar.js`)

```js
export function loadNavbar() {
  const session = getSession();
  // If no session: show only the logo
  // If session: show name, role badge, and logout button
}
```

The logout button calls `clearSession()` + `loadNavbar()` + `navigateTo('/login')`.

**Why a component?** Both `app.js` (initial load) and `loginView.js` (after login) need to re-render the navbar. A function keeps it DRY.

---

### Step 10 — Login View (`pages/loginView.js`)

```js
export function renderLogin() {
  content.innerHTML = `... form HTML ...`;
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
}

async function handleLogin() {
  // 1. Get email + password from inputs
  // 2. Validate (not empty)
  // 3. Call login(email, password) from api.js
  // 4. If null → show error message
  // 5. If user → setSession(user) + loadNavbar() + navigateTo(ROLE_HOME[role])
}
```

**Key pattern:** The view builds its HTML as a template literal, injects it into `#content`, then immediately attaches event listeners.

---

### Step 11 — Manager View (`pages/managerView.js`)

```js
export async function renderManager() {
  // 1. guardRoute('manager') → handle unauthenticated / unauthorized
  // 2. Fetch all projects + all users in parallel: Promise.all([...])
  // 3. Render stats grid
  // 4. Render projects table
  // 5. Attach events: new project button, edit/delete delegation, search/filter
}
```

For create/edit, delegate to `projectModal.js` which receives an `onSubmit` callback.

**Event delegation pattern:**
```js
container.addEventListener('click', (e) => {
  const editBtn = e.target.closest('.edit-btn');
  if (editBtn) { /* handle edit */ }
});
```

---

### Step 12 — Collaborator View (`pages/collaboratorView.js`)

```js
export async function renderCollaborator() {
  // 1. guardRoute('collaborator')
  // 2. getProjectsByUser(session.id)  ← only assigned projects
  // 3. Render stats + table with status dropdowns
  // 4. Save button calls updateProject(id, { status }) only
}
```

No create, edit, or delete buttons are ever rendered for this role.

---

### Step 13 — Entry Point (`app.js`)

```js
window.addEventListener('DOMContentLoaded', async () => {
  loadNavbar();          // render navbar from session
  await router();        // render correct page

  // SPA link interception
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    navigateTo(link.getAttribute('href'));
  });
});

window.addEventListener('popstate', router);   // back/forward buttons
```

**Why `DOMContentLoaded`?** Ensures `#navbar` and `#content` exist in the DOM before JavaScript tries to write to them.

---

### Bonus Features Implemented

- ✅ **Search** — filter projects by name/description in real time
- ✅ **Filter by status** — dropdown to narrow results
- ✅ **Toast notifications** — success/error feedback after every action
- ✅ **Loader** — spinner shown while fetching data
- ✅ **Responsive design** — mobile-friendly layout with CSS Grid

---

## License

MIT

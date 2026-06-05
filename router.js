/* =============================================
   CSS VARIABLES & RESET
   ============================================= */
:root {
  --color-primary:   #4f46e5;
  --color-primary-h: #4338ca;
  --color-danger:    #ef4444;
  --color-success:   #22c55e;
  --color-warning:   #f59e0b;
  --color-info:      #3b82f6;

  --color-bg:        #f8fafc;
  --color-surface:   #ffffff;
  --color-border:    #e2e8f0;
  --color-text:      #1e293b;
  --color-muted:     #64748b;

  --radius:   8px;
  --shadow:   0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md:0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06);

  --font: 'Segoe UI', system-ui, sans-serif;
  --transition: 0.18s ease;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 15px;
  line-height: 1.6;
  min-height: 100vh;
}

/* =============================================
   LAYOUT
   ============================================= */
#app { display: flex; flex-direction: column; min-height: 100vh; }

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* =============================================
   NAVBAR
   ============================================= */
#navbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.85rem 1rem;
  gap: 1rem;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-brand span { color: var(--color-text); font-weight: 400; font-size: 0.85rem; }

.navbar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.badge-role {
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.badge-role.manager      { background: #ede9fe; color: #6d28d9; }
.badge-role.collaborator { background: #dcfce7; color: #16a34a; }

/* =============================================
   BUTTONS
   ============================================= */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition), transform var(--transition), opacity var(--transition);
  white-space: nowrap;
}
.btn:active { transform: scale(.97); }
.btn:disabled { opacity: .55; cursor: not-allowed; }

.btn-primary   { background: var(--color-primary); color: #fff; }
.btn-primary:hover { background: var(--color-primary-h); }

.btn-danger    { background: var(--color-danger); color: #fff; }
.btn-danger:hover { background: #dc2626; }

.btn-ghost {
  background: transparent;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}
.btn-ghost:hover { background: var(--color-bg); color: var(--color-text); }

.btn-sm { padding: 0.3rem 0.65rem; font-size: 0.8rem; }
.btn-icon { padding: 0.4rem; border-radius: 6px; }

/* =============================================
   CARD
   ============================================= */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

/* =============================================
   FORMS
   ============================================= */
.form-group { display: flex; flex-direction: column; gap: 0.35rem; }

label {
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: .03em;
}

input, select, textarea {
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-family: var(--font);
  color: var(--color-text);
  background: var(--color-surface);
  transition: border-color var(--transition), box-shadow var(--transition);
  width: 100%;
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79,70,229,.12);
}

textarea { resize: vertical; min-height: 80px; }

/* =============================================
   ALERTS
   ============================================= */
.alert {
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  border-left: 4px solid transparent;
  margin-bottom: 1rem;
}
.alert-danger  { background: #fef2f2; border-color: var(--color-danger);  color: #991b1b; }
.alert-success { background: #f0fdf4; border-color: var(--color-success); color: #166534; }
.alert-info    { background: #eff6ff; border-color: var(--color-info);    color: #1e40af; }
.alert.hidden  { display: none; }

/* =============================================
   STATUS BADGES
   ============================================= */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}
.status-pending    { background: #fef9c3; color: #854d0e; }
.status-progress   { background: #dbeafe; color: #1e40af; }
.status-completed  { background: #dcfce7; color: #166534; }
.status-cancelled  { background: #f1f5f9; color: #475569; }

/* =============================================
   STATS GRID
   ============================================= */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1rem 1.25rem;
  border-top: 3px solid var(--color-primary);
}
.stat-card.danger  { border-top-color: var(--color-danger); }
.stat-card.success { border-top-color: var(--color-success); }
.stat-card.warning { border-top-color: var(--color-warning); }

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
}
.stat-label {
  font-size: 0.78rem;
  color: var(--color-muted);
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: .04em;
}

/* =============================================
   TABLE
   ============================================= */
.table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

thead { background: var(--color-bg); }

th {
  padding: 0.65rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: .04em;
  border-bottom: 1px solid var(--color-border);
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  vertical-align: middle;
}

tr:last-child td { border-bottom: none; }
tr:hover td { background: #fafbfc; }

.actions-cell { display: flex; gap: 0.4rem; align-items: center; }

/* =============================================
   LOGIN PAGE
   ============================================= */
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem 1rem;
}

.login-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
}

.login-logo {
  text-align: center;
  margin-bottom: 1.75rem;
}
.login-logo h1 { font-size: 1.5rem; color: var(--color-primary); font-weight: 700; }
.login-logo p  { font-size: 0.85rem; color: var(--color-muted); margin-top: 0.25rem; }

.login-form { display: flex; flex-direction: column; gap: 1rem; }

.btn-block { width: 100%; justify-content: center; padding: 0.65rem; font-size: 0.95rem; }

/* =============================================
   MODAL
   ============================================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
  animation: fadeIn .15s ease;
}
.modal-backdrop.hidden { display: none; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.modal-box {
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,.15);
  width: 100%;
  max-width: 480px;
  animation: slideUp .18s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}
.modal-header h3 { font-size: 1rem; font-weight: 600; }

.modal-body  { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.btn-close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--color-muted);
  line-height: 1;
  padding: 0.2rem;
  border-radius: 4px;
  transition: color var(--transition);
}
.btn-close-modal:hover { color: var(--color-text); }

/* =============================================
   TOOLBAR (search + filter)
   ============================================= */
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  min-width: 180px;
}

.select-filter { width: auto; min-width: 140px; flex-shrink: 0; }

/* =============================================
   TOAST
   ============================================= */
#toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  background: var(--color-text);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  font-size: 0.875rem;
  animation: slideUp .2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 220px;
}
.toast.success { background: #166534; }
.toast.danger  { background: #991b1b; }

/* =============================================
   DASHBOARD WELCOME
   ============================================= */
.page-header {
  margin-bottom: 1.5rem;
}
.page-header h2 { font-size: 1.4rem; font-weight: 700; }
.page-header p  { color: var(--color-muted); font-size: 0.875rem; margin-top: 0.2rem; }

/* =============================================
   EMPTY STATE
   ============================================= */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-muted);
}
.empty-state p { margin-top: 0.5rem; font-size: 0.9rem; }

/* =============================================
   LOADER
   ============================================= */
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* =============================================
   ACCESS DENIED
   ============================================= */
.access-denied {
  text-align: center;
  padding: 4rem 1rem;
}
.access-denied h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
.access-denied p  { color: var(--color-muted); margin-bottom: 1.25rem; }

/* =============================================
   RESPONSIVE
   ============================================= */
@media (max-width: 600px) {
  .card { padding: 1rem; }
  .login-box { padding: 1.75rem 1.25rem; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .table-wrapper { font-size: 0.8rem; }
  th, td { padding: 0.5rem 0.65rem; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .select-filter { width: 100%; }
  .modal-box { max-width: 100%; }
}

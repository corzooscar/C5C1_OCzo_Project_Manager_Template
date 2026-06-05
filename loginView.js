/**
 * navbar.js — Dynamic Navbar Component
 * Renders based on current session (logged in / role).
 */
import { getSession, clearSession } from '../utils/session.js';
import { navigateTo } from '../router.js';

export function loadNavbar() {
  const navbar = document.getElementById('navbar');
  const session = getSession();

  if (!session) {
    navbar.innerHTML = `
      <nav class="navbar">
        <a class="navbar-brand" href="/login" data-link>
          📋 <strong>ProjectManager</strong>
        </a>
      </nav>`;
    return;
  }

  navbar.innerHTML = `
    <nav class="navbar">
      <a class="navbar-brand" href="/${session.role === 'manager' ? 'dashboard' : 'my-projects'}" data-link>
        📋 <strong>ProjectManager</strong>
      </a>
      <div class="navbar-user">
        <span>${session.name}</span>
        <span class="badge-role ${session.role}">${session.role}</span>
        <button class="btn btn-ghost btn-sm" id="logoutBtn">Logout</button>
      </div>
    </nav>`;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearSession();
    loadNavbar();
    navigateTo('/login');
  });
}

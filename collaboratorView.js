/**
 * projectModal.js — Reusable Project Form Modal
 * Used by manager view for create and edit actions.
 */
import { today } from '../utils/helpers.js';

/**
 * Opens the project modal (create or edit mode).
 * @param {Object} options
 * @param {Object|null}   options.project   - null = create, object = edit
 * @param {Array}         options.users     - list of all users for assignedTo select
 * @param {Function}      options.onSubmit  - called with form data on submit
 */
export function openProjectModal({ project = null, users = [], onSubmit }) {
  // Remove existing modal if any
  document.getElementById('projectModal')?.remove();

  const isEdit = !!project;
  const title  = isEdit ? 'Edit Project' : 'New Project';

  const userOptions = users
    .filter(u => u.role === 'collaborator')
    .map(u => `<option value="${u.id}" ${project?.assignedTo === u.id ? 'selected' : ''}>${u.name}</option>`)
    .join('');

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled']
    .map(s => `<option value="${s}" ${project?.status === s ? 'selected' : ''}>${s}</option>`)
    .join('');

  const modal = document.createElement('div');
  modal.id = 'projectModal';
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-header">
        <h3 id="modalTitle">${title}</h3>
        <button class="btn-close-modal" id="closeModal" aria-label="Close">×</button>
      </div>
      <div class="modal-body">
        <div class="alert hidden" id="modalAlert"></div>
        <div class="form-group">
          <label for="pName">Project Name</label>
          <input type="text" id="pName" placeholder="e.g. Website Redesign" value="${project?.name || ''}" required />
        </div>
        <div class="form-group">
          <label for="pDesc">Description</label>
          <textarea id="pDesc" placeholder="Brief description...">${project?.description || ''}</textarea>
        </div>
        <div class="form-group">
          <label for="pStatus">Status</label>
          <select id="pStatus">${statusOptions}</select>
        </div>
        <div class="form-group">
          <label for="pAssigned">Assigned To</label>
          <select id="pAssigned">${userOptions}</select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="cancelModal">Cancel</button>
        <button class="btn btn-primary" id="submitModal">${isEdit ? 'Save Changes' : 'Create Project'}</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // Close handlers
  const close = () => modal.remove();
  document.getElementById('closeModal').addEventListener('click', close);
  document.getElementById('cancelModal').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  // Submit
  document.getElementById('submitModal').addEventListener('click', () => {
    const name       = document.getElementById('pName').value.trim();
    const description= document.getElementById('pDesc').value.trim();
    const status     = document.getElementById('pStatus').value;
    const assignedTo = parseInt(document.getElementById('pAssigned').value);
    const alertEl    = document.getElementById('modalAlert');

    if (!name) {
      alertEl.textContent = 'Project name is required.';
      alertEl.className = 'alert alert-danger';
      return;
    }

    const data = {
      name,
      description,
      status,
      assignedTo,
      createdAt: project?.createdAt || today(),
    };

    onSubmit(data);
    close();
  });
}

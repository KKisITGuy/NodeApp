// public/js/index.js
const listBody = document.getElementById('list-body');
function esc(s){ return (s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function load(){
  const res = await fetch('/api/customers');
  const list = await res.json();
  listBody.innerHTML = list.map((c, i) => `
    <div class="list-row" data-id="${c.id}">
      <div class="cell-sn">${i+1}</div>
      <div class="cell-name">${esc(c.fullname)}</div>
      <div class="cell-actions">
        <a class="btn btn-primary" href="view.html?id=${c.id}">View</a>
        <a class="btn btn-secondary" href="edit.html?id=${c.id}">Edit</a>
        <button class="btn btn-danger delete">Delete</button>
      </div>
    </div>`).join('');
}

listBody.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('delete')) return;
  const row = e.target.closest('.list-row');
  const id = row?.dataset.id;
  if (!id) return;
  const ok = await window.confirmDialog({
    title: 'Delete customer',
    message: 'Are you sure you want to delete this customer? This action cannot be undone.',
    confirmText: 'Yes, delete',
    cancelText: 'No',
    danger: true
  });
  if (!ok) return;
  const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
  if (!res.ok){ const err = await res.json().catch(()=>({})); alert('Delete failed: '+(err.error||res.statusText)); return; }
  await load();
});

load();


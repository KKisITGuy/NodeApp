// public/js/add.js
document.getElementById('add-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fullname = document.getElementById('fullname').value.trim();
  const addressline = document.getElementById('addressline').value.trim();
  if (!fullname || !addressline){ alert('Both fields are required'); return; }
  const res = await fetch('/api/customers', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ fullname, addressline }) });
  if (!res.ok){ const err = await res.json().catch(()=>({})); alert('Save failed: '+(err.error||res.statusText)); return; }
  location.href = 'index.html';
});

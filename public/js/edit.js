// public/js/edit.js
(async function(){
  const id = new URLSearchParams(location.search).get('id');
  if (!id){ location.href='index.html'; return; }
  const res = await fetch('/api/customers/'+id);
  if (!res.ok){ alert('Customer not found'); location.href='index.html'; return; }
  const c = await res.json();
  document.getElementById('id').value = c.id;
  document.getElementById('id-display').value = c.id;
  document.getElementById('fullname').value = c.fullname || '';
  document.getElementById('addressline').value = c.addressline || '';


 document.getElementById('edit-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const payload = {
      fullname: document.getElementById('fullname').value.trim(),
      addressline: document.getElementById('addressline').value.trim(),
    };
    if (!payload.fullname || !payload.addressline){ alert('Both fields are required'); return; }
    const res2 = await fetch('/api/customers/'+id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    if (!res2.ok){ const err = await res2.json().catch(()=>({})); alert('Save failed: '+(err.error||res2.statusText)); return; }
    location.href = 'index.html';
  });
})();

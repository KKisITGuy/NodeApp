// public/js/view.js
(async function(){
  const id = new URLSearchParams(location.search).get('id');
  if (!id){ location.href='index.html'; return; }
  const res = await fetch('/api/customers/'+id);
  if (!res.ok){ alert('Customer not found'); location.href='index.html'; return; }
  const c = await res.json();
  document.getElementById('d-id').textContent = c.id;
  document.getElementById('d-fullname').textContent = c.fullname || '';
  document.getElementById('d-address').textContent = c.addressline || '';
})();


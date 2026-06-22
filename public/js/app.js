document.querySelectorAll('[data-toggle-auto]').forEach(chk => {
    chk.addEventListener('change', () => {
        chk.closest('form').querySelector('.auto-fields')?.classList.toggle('d-none', !chk.checked);
    });
});

const search = document.querySelector('#tableSearch');
if (search) {
    search.addEventListener('input', () => {
        const q = search.value.toLowerCase();
        document.querySelectorAll('[data-filter-table] tbody tr').forEach(tr => {
            tr.style.display = tr.innerText.toLowerCase().includes(q) ? '' : 'none';
        });
    });
}

document.querySelectorAll('.sidebar nav a').forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) link.classList.add('active');
});

setTimeout(() => document.querySelectorAll('.alert').forEach(a => a.remove()), 4500);

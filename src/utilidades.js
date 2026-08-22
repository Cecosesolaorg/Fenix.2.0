/**
 * Utility Functions
 */

function formatPrice(val) {
    const num = parseFloat(String(val).replace(/[$,]/g, '').trim());
    return isNaN(num) ? '0.00' : num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function showStatus(msg, type) {
    if (!statusMsg) return;
    statusMsg.textContent = msg;
    statusMsg.style.color = type === 'error' ? '#ef4444' : '#10b981';
    setTimeout(() => { if (statusMsg.textContent === msg) statusMsg.textContent = ''; }, 3000);
}

function initDate() {
    if (!dateEl) return;
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formatted = `${day}/${month}/${year}`;
    dateEl.textContent = `Hoy: ${formatted}`;
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
            if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
        });
    }
}

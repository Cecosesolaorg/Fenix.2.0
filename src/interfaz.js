/**
 * UI Rendering and Initialization
 */

function selectFeria(name) {
    console.log("Seleccionando feria:", name);
    localStorage.setItem('feriaSelection', name);

    if (name === 'Este') {
        window.location.href = 'este.html';
    } else if (name === 'Centro') {
        window.location.href = 'centro.html';
    } else if (name === 'Ruiz Pineda') {
        window.location.href = 'ruiz.html';
    } else {
        window.location.href = 'precios.html';
    }
}

function initFeria() {
    const path = window.location.pathname;
    if (path.includes('centro.html')) {
        applyFeria('centro');
        return;
    } else if (path.includes('este.html')) {
        applyFeria('este');
        return;
    } else if (path.includes('ruiz.html')) {
        applyFeria('ruiz');
        return;
    }

    const savedFeriaId = localStorage.getItem('feriaSelection');
    if (savedFeriaId && FERIAS[savedFeriaId]) {
        applyFeria(savedFeriaId);
    } else {
        const modal = document.getElementById('feria-modal');
        if (modal) modal.style.display = 'flex';
    }
}

function setFeria(id) {
    localStorage.setItem('feriaSelection', id);
    applyFeria(id);
    const modal = document.getElementById('feria-modal');
    if (modal) modal.style.display = 'none';
}

function applyFeria(id) {
    currentFeria = FERIAS[id];
    if (mainTitle) mainTitle.textContent = `Tickera ${currentFeria.name} `;

    const mascotaBtn = document.getElementById('mascota-btn');
    const charcuteriaBtn = document.getElementById('charcuteria-btn');
    const pedidosBtn = document.getElementById('pedidos-btn');

    if (mascotaBtn) mascotaBtn.style.display = 'flex';
    if (charcuteriaBtn) charcuteriaBtn.style.display = 'flex';

    const isCharPage = window.location.pathname.includes('charcuteria.html');
    if (pedidosBtn) {
        pedidosBtn.style.display = (id === 'este' || isCharPage) ? 'flex' : 'none';
    }

    renderGrid();
}

function initPresets(type = 'fruit') {
    if (!presetsGrid) return;

    const title = document.querySelector('#presets-modal h2');
    presetsGrid.innerHTML = '';
    let products = [];
    let titleContent = '';

    if (type === 'fruit') {
        products = PRESET_PRODUCTS;
        titleContent = 'Productos de Frutería';
    } else if (type === 'pet') {
        products = PET_PRODUCTS;
        titleContent = 'Productos para Mascotas';
    } else if (type === 'charcuteria') {
        products = CHARCUTERIA_PRODUCTS;
        titleContent = 'Productos de Charcutería';
    }

    if (title) title.textContent = titleContent;

    products.forEach(product => {
        const btn = document.createElement('button');
        btn.className = 'preset-btn';
        btn.textContent = product;
        btn.onclick = () => {
            presetsModal.style.display = 'none';
            openManualModal(product.toUpperCase());
        };
        presetsGrid.appendChild(btn);
    });
}

function populateCharcuteria() {
    if (typeof CHARCUTERIA_PRODUCTS === 'undefined') return;
    allCards = CHARCUTERIA_PRODUCTS.map((name, index) => ({
        id: 'charc-' + index,
        name: name,
        price: '0.00',
        isManual: true
    }));
    renderGrid();
}

function renderControls() {
    const container = document.querySelector('.button-group');
    if (!container) return;

    const feriaId = localStorage.getItem('selectedFeria') || 'centro';
    const config = UI_CONFIG[feriaId] || UI_CONFIG['centro'];

    const oldPresets = container.querySelectorAll('.dynamic-btn');
    oldPresets.forEach(b => b.remove());

    const manualBtn = document.getElementById('manual-btn');

    config.buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'btn dynamic-btn';
        button.style.backgroundColor = btn.color;
        button.style.color = 'white';
        button.innerHTML = `<i data-lucide="${btn.icon}"></i> ${btn.label}`;
        button.onclick = () => {
            btn.action();
            if (btn.id !== 'char' || feriaId === 'este') {
                presetsModal.style.display = 'flex';
            }
        };
        if (manualBtn) container.insertBefore(button, manualBtn);
        else container.appendChild(button);
    });

    if (window.lucide) lucide.createIcons();
}

window.selectFeria = selectFeria;
window.setFeria = setFeria;
window.initPresets = initPresets;
window.populateCharcuteria = populateCharcuteria;

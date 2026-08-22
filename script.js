/**
 * Fénix Ticker Premium - JavaScript Logic
 */

// --- Constants ---
const FERIAS = {
    'centro': { name: 'Feria del Centro', handle: '@redcecosesola | FERIA DEL CENTRO' },
    'este': { name: 'Feria del Este', handle: '@redcecosesola | FERIA DEL ESTE' },
    'ruiz': { name: 'Feria de Ruiz Pineda', handle: '@redcecosesola | FERIA DE RUIZ PINEDA' },
    // Soporte para nombres descriptivos que vienen del index.html
    'Centro': { name: 'Feria del Centro', handle: '@redcecosesola | FERIA DEL CENTRO' },
    'Este': { name: 'Feria del Este', handle: '@redcecosesola | FERIA DEL ESTE' },
    'Ruiz Pineda': { name: 'Feria de Ruiz Pineda', handle: '@redcecosesola | FERIA DE RUIZ PINEDA' }
};

const PRESET_PRODUCTS = [
    "Arándanos", "Borojo", "Manzanas Amarilla 100", "Ciruela Criolla", "Cambur",
    "Durazno Rojo", "Peras 90", "Lulo", "Manzanas Roja 100", "Naranja Importada",
    "Manzanas Roja 150", "Manzana Verde 125", "Ciruela Importada", "Guayaba",
    "Mandarina Nacional", "Uchua", "Pitahaya Roja", "Cebolla Morada", "Tomate de Arbol",
    "Coco", "Uva Importada", "Limón Persa", "Mandarina Importada", "Fresas", "Kiwi",
    "Pimentón Rojo", "Parchita", "Ajo Criollo 125 gr", "Espinaca en Bolsa",
    "Mora Congelada", "Pera Melón", "Naranja Tanyelo", "Uva Criolla", "Papa Colombiana"
];

const PET_PRODUCTS = [
    "ARRO PICO 50*", "ARENA PESADA 50*", "ALPISTE 50*", "CERDO GENERICO", "CONVACA N 15",
    "INICIADOR P1", "GIRASOL", "ENGORDE EL TUNAL", "MAIZ AMARILLO", "MAIZ PICO",
    "MULTIPOLLO", "MULTIPONEDORA", "PONEDORA CORPO AGRO", "PONEDORA CONVACA",
    "VITALIN CONEJARINA", "POLVO PERUANO", "PRAXIMIDIVET", "SHAMPU HIPOLERGENICO",
    "SHAMPU PECARE", "SHAMPU PIGREE ADULTO", "SHAMPU VIMODOG", "SHAMPU YONG LIVING",
    "SPRAY GUSAVE", "SPRAY MATA CUCARACHA", "SPRAY MATA MOSCA", "STOP ANTI DERREICO",
    "TALCO PULGUISIDA", "ULTRA RAT RATICIDA", "VERMI OUT", "VITAMINA CHUMKY",
    "PERRARINA RINGO ADULTO", "PERRARINA RINGO CACHORRO", "PERRARINA DOG CHOW",
    "PERRAEINA K-NINA", "PERRAEINA SUPERCAN", "PERRARINA SUPERCAN CACHORRO",
    "PERARINA SUPERCAN CQT", "PERRARINA DOGURMET ADULTO", "PERRARINA DOGORMET CACHORRO",
    "PERRARINA FILPO", "PERRARINA ITALCAN", "PERRARINA TOP DOG", "PERRARINA CHAMP`S",
    "VITAMINA C VITANAMINA E", "GATARINA GATSY", "GATARINA CIPACAT", "GATARINA MIRRINGO ADULTO",
    "GATARINA MIRRINGO CACHORRO", "GATARINA MIRRINGO+PRO ADULTO", "GATARINA DON CAT",
    "OFTACSI GOTAS", "OMEGAKIN", "OREJAS DECERDO", "PAJARINA", "PAPILLA DE GATO",
    "PECHERA DE GATO", "PENTAVIVAL", "PEGA MOSCA", "PIPETA PERRO 11- A 20 KG"
];

const CHARCUTERIA_PRODUCTS = [
    "HUEVOS 1/2 ", "CASABE", "CHICHA GUARALAC 400GM", "CHORIZO AHUMADO", "CHULETA",
    "CREMA DON EUSTOQUIO 500 GR", "DIABLITO PLUMROSE", "DULCE DE LECHE", "GELATINA ARCOIRIS",
    "GELATINA ARCOIRIS GRANDE", "HELADO CHOCO MANI", "HELADO CHOCO MANTECADO",
    "HELADO CHOCO MOROCHO", "HELADO CONO CHICLE", "HELADO EXOTICO", "HELADO MAX POLET",
    "HELADO POLET FERRERO", "HELADO SUPER CONO", "HELADO TINITA", "HELADOS FRESS",
    "HUESO AHUMADO", "JAMON AHUMADO", "JAMON AREPERO", "JAMON DE PAVO", "JAMON ESPALDA ORST",
    "JAMON ESPALDA VIGOR", "JAMON PIERNA ARICHUNA", "JAMON PIERNA FIESTA", "JUGO GUARALAC 1.5ML",
    "JUGO GUARALAC 400CC", "JUGO GUARALAC 900CC", "JUGO JUSTY 1.5L", "LECHE PURISIMA COMPLETA",
    "LECHE PURISIMA DESCREMADA", "LECHE PURISIMA DESLACTOSADA", "LECHE SAN SIMON",
    "MARQUESAS", "MASA GRANDE", "MASAS PEQUEÑA", "MAX POÑLET WHITE FERRERO",
    "MINI SALCHICHAS FIESTA", "MORTADELA ALIBAL 1/2KG", "MORTADELA ALIBAL DE 1KG",
    "MORTADELA ALPRO 400G", "MORTADELA ALPRO 900G", "MORTADELA ARICHUNA", "MORTADELA BOLGNA 1/2KG",
    "MORTADELA CARACAS 900G", "MORTADELA ESPECIAL", "MORTADELA EXTRA", "MORTADELA PLUMROSE 1KG",
    "MORTADELA PUNTA DEL MONTE 1/2KG", "MORTADELA PUNTA DEL MONTE DE 1KG", "MORTADELA TAPARA",
    "NATILLA GUARALAC", "NATILLA VEGA", "PAN ARABE", "PAN DE SANDWICH INTEGRAL",
    "PAN DE SANDWICH NORMAL", "QUESILLO ARCOIRIS", "QUESO DE CABRA", "QUESO AMARILLO",
    "QUESO BLANCO", "QUESO CREMA DE CABRA", "QUESO CRINEJA", "QUESO DE AÑO POTE",
    "QUESO DE MANO POTE VERANO", "QUESO GUAYANEZ", "QUESO MOZZARELLA", "QUESO MOZZARELLA PIEZA",
    "QUESO PAISA", "QUESO PECORINO", "QUESO RAYADO", "QUESO REQUESON", "RECORTE CHULETA-TOCINETA",
    "RECORTE VARIOS", "REFRESCO GLUP 2L", "REFRESCO PEPSI 1.5 LT", "RICOTA CABRA BARAGUA",
    "RICOTA DE CABRA", "RICOTA POTE VERANO", "SALCHICA POLACA", "SALCHICHA DE POLLO ALPRO",
    "SUERO GUARALAC", "SUERO KASERO 850 ML", "SUERO PICANTE", "SUERO PICANTE PEQUE",
    "SUERO VEGA 800ML", "TOCINETA", "YOGUR ARCOIRIS GRAND", "YOGUR ARCOIRIS PEQ",
    "YOGURT GUARALAC 400 ML", "YOGURT NATURAL"
];

// --- State ---
let allCards = [];
let selectedIds = new Set();
let currentFeria = null;
let nextManualId = 10000;
let nextExcelId = 1;
let tasaBCV = localStorage.getItem('tasaBCV') || 0;
let bcvHistory = JSON.parse(localStorage.getItem('bcvHistory') || '[]');

// --- DOM Elements ---
const priceGrid = document.getElementById('price-grid');
const searchBox = document.getElementById('search-box');
const statusMsg = document.getElementById('status-message');
const emptyState = document.getElementById('empty-state');
const printBtn = document.getElementById('print-btn');
const excelInput = document.getElementById('excel-file');
const dropZone = document.getElementById('drop-zone');

// --- Functions for index.html ---
function selectFeria(name) {
    console.log("Seleccionando feria:", name);
    // Guardamos la selección
    localStorage.setItem('feriaSelection', name);

    // Redirigimos a la página específica
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
window.selectFeria = selectFeria;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en precios.html (existe el grid de precios)
    if (priceGrid) {
        initTheme();
        initDate();
        initFeria();
        setupEventListeners();
        initPresets();
        if (window.lucide) lucide.createIcons();
    }
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
            if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
        });
    }
}
function initDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formatted = `${day}/${month}/${year}`;

    dateEl.textContent = `Hoy: ${formatted}`;
}

function injectHistoryModal() {
    if (document.getElementById('bcv-history-modal')) return;

    const div = document.createElement('div');
    div.id = 'bcv-history-modal';
    div.className = 'modal-overlay';
    div.style.zIndex = "3000";
    div.innerHTML = `
        <div class="modal-content" style="max-width: 400px; padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="font-weight: 800; font-size: 1.2rem; margin: 0;">Historial BCV</h2>
                <button class="btn" onclick="document.getElementById('bcv-history-modal').style.display='none'" style="padding: 0.5rem;"><i data-lucide="x"></i></button>
            </div>
            
            <div id="history-list" style="max-height: 250px; overflow-y: auto; margin-bottom: 20px; border: 1px solid #f1f5f9; border-radius: 8px;">
                <!-- History items here -->
            </div>

            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" onclick="updateBCVManual()" style="flex: 1; justify-content: center;">Modificar Tasa</button>
                <button class="btn btn-warning" onclick="fetchTasaBCV()" style="flex: 1; justify-content: center;">Actualizar</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    if (window.lucide) lucide.createIcons();
}

function openHistoryModal() {
    const modal = document.getElementById('bcv-history-modal');
    if (!modal) return;

    renderHistoryList();
    modal.style.display = 'flex';
}

function renderHistoryList() {
    const listEl = document.getElementById('history-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    bcvHistory.forEach((entry, idx) => {
        const item = document.createElement('div');
        item.style.cssText = "display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; font-size: 0.9rem;";
        const date = new Date(entry.timestamp).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

        // Calcular cambio
        let trendIcon = '';
        if (idx < bcvHistory.length - 1) {
            const prev = bcvHistory[idx + 1].rate;
            if (entry.rate > prev) trendIcon = '<i data-lucide="chevrons-up" style="color: #ef4444; width: 14px; height: 14px;"></i>';
            else if (entry.rate < prev) trendIcon = '<i data-lucide="chevrons-down" style="color: #10b981; width: 14px; height: 14px;"></i>';
        }

        item.innerHTML = `
            <span>${date}</span>
            <span style="font-weight: 700;">${trendIcon} ${entry.rate.toFixed(2)} Bs</span>
        `;
        listEl.appendChild(item);
    });
    if (window.lucide) lucide.createIcons();
}

function updateBCVManual() {
    const newRate = prompt("Ingresa el precio del dólar BCV manual:", tasaBCV);
    if (newRate !== null) {
        const rateNum = parseFloat(newRate);
        if (!isNaN(rateNum) && rateNum > 0) {
            tasaBCV = rateNum;
            saveRateToHistory(rateNum);
            updateRateDisplay(rateNum);
            showStatus('Tasa BCV actualizada manualmente', 'success');
        }
    }
}

function saveRateToHistory(rate) {
    const timestamp = new Date().getTime();
    // No duplicar si es la misma tasa que la última grabada (con poco margen de tiempo)
    if (bcvHistory.length > 0 && bcvHistory[0].rate === rate) return;

    bcvHistory.unshift({ rate, timestamp });
    bcvHistory = bcvHistory.slice(0, 10); // Mantener 10 registros
    localStorage.setItem('bcvHistory', JSON.stringify(bcvHistory));
}

function updateRateDisplay(rate) {
    // Ya no se muestra en el header, pero mantenemos la lógica por si se usa en otros lados
    console.log(`Tasa BCV actualizada: ${rate}`);
}

async function fetchTasaBCV() {
    try {
        const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        const data = await response.json();
        const rate = data.promedio;
        tasaBCV = rate;

        saveRateToHistory(rate);
        updateRateDisplay(rate);

        localStorage.setItem('tasaBCV', rate);
        return rate;
    } catch (error) {
        console.error('Error fetching BCV rate:', error);
        const rateEl = document.getElementById('tasa-bcv');
        if (rateEl) rateEl.textContent = 'BCV: No disponible';
    }
}

function initFeria() {
    // Detectar feria por el nombre del archivo
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
window.setFeria = setFeria;

function applyFeria(id) {
    currentFeria = FERIAS[id];
    const title = document.getElementById('main-title');
    if (title) title.textContent = `Tickera ${currentFeria.name} `;

    // Show/Hide specific buttons for Este
    const mascotaBtn = document.getElementById('mascota-btn');
    const charcuteriaBtn = document.getElementById('charcuteria-btn');
    const pedidosBtn = document.getElementById('pedidos-btn');

    if (mascotaBtn) mascotaBtn.style.display = 'flex';
    if (charcuteriaBtn) charcuteriaBtn.style.display = 'flex';

    // El botón de pedidos siempre se ve en charcutería, o si es feria del este
    const isCharPage = window.location.pathname.includes('charcuteria.html');
    if (pedidosBtn) {
        pedidosBtn.style.display = (id === 'este' || isCharPage) ? 'flex' : 'none';
    }

    renderGrid(); // Re-render to update handles
}

function initPresets(type = 'fruit') {
    const grid = document.getElementById('presets-grid');
    const title = document.querySelector('#presets-modal h2');
    if (!grid) return;

    grid.innerHTML = '';
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
            document.getElementById('presets-modal').style.display = 'none';
            openManualModal(product.toUpperCase());
        };
        grid.appendChild(btn);
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
window.populateCharcuteria = populateCharcuteria;
window.initPresets = initPresets;

// --- Navigation & UI Config ---
const UI_CONFIG = {
    'centro': {
        buttons: [
            { id: 'fruit', label: 'Frutería', icon: 'apple', color: '#f472b6', action: () => initPresets('fruit') },
            { id: 'char', label: 'Charcutería', icon: 'beef', color: '#3b82f6', action: () => window.location.href = 'charcuteria.html' }
        ]
    },
    'este': {
        buttons: [
            { id: 'fruit', label: 'Frutería', icon: 'apple', color: '#f472b6', action: () => initPresets('fruit') },
            { id: 'pet', label: 'Mascota', icon: 'dog', color: '#8b5cf6', action: () => initPresets('pet') },
            { id: 'char', label: 'Charcutería', icon: 'beef', color: '#3b82f6', action: () => initPresets('char') }
        ]
    },
    'ruiz': {
        buttons: [
            { id: 'fruit', label: 'Frutería', icon: 'apple', color: '#f472b6', action: () => initPresets('fruit') }
        ]
    }
};

function renderControls() {
    const container = document.querySelector('.button-group');
    if (!container) return;

    // Mantener solo los botones base (Buscar, Nuevo Ticket, Imprimir)
    // Pero los de presets (Feria, Mascota, etc.) los haremos dinámicos
    const feriaId = localStorage.getItem('selectedFeria') || 'centro';
    const config = UI_CONFIG[feriaId] || UI_CONFIG['centro'];

    // Limpiamos botones viejos de presets si existen
    const oldPresets = container.querySelectorAll('.dynamic-btn');
    oldPresets.forEach(b => b.remove());

    // Insertar botones dinámicos antes del botón "Nuevo Ticket"
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
                document.getElementById('presets-modal').style.display = 'flex';
            }
        };
        container.insertBefore(button, manualBtn);
    });

    if (window.lucide) lucide.createIcons();
}

// --- Event Listeners ---
function setupEventListeners() {
    // Excel Upload
    if (dropZone) dropZone.onclick = () => excelInput.click();
    if (excelInput) excelInput.onchange = (e) => handleFile(e.target.files[0]);

    // Drag & Drop
    if (dropZone) {
        dropZone.ondragover = (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; };
        dropZone.ondragleave = () => { dropZone.style.borderColor = '#cbd5e1'; };
        dropZone.ondrop = (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#cbd5e1';
            handleFile(e.dataTransfer.files[0]);
        };
    }

    // Modals
    const manualBtn = document.getElementById('manual-btn');
    if (manualBtn) manualBtn.onclick = () => openManualModal();

    const closeManual = document.getElementById('close-manual-btn');
    if (closeManual) closeManual.onclick = () => document.getElementById('manual-modal').style.display = 'none';

    const saveManual = document.getElementById('save-manual-btn');
    if (saveManual) saveManual.onclick = saveManualTicket;

    const closePresets = document.getElementById('close-presets-btn');
    if (closePresets) closePresets.onclick = () => document.getElementById('presets-modal').style.display = 'none';

    // Search
    if (searchBox) searchBox.oninput = () => renderGrid(searchBox.value.trim().toLowerCase());

    // Print
    if (printBtn) printBtn.onclick = handlePrint;

    // Unload warning
    window.onbeforeunload = (e) => {
        if (allCards.length > 0) return "Se perderán los datos cargados.";
    };

    // Render initial dynamic controls
    renderControls();
}

// --- Logic ---
function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => processExcel(e.target.result);
    reader.readAsArrayBuffer(file);
}

function processExcel(data) {
    try {
        const workbook = XLSX.read(data, { type: 'array' });

        const now = new Date();
        const diaNum = String(now.getDate()).padStart(2, '0');
        const mesNum = String(now.getMonth() + 1).padStart(2, '0');
        const fechaHoy = `${diaNum} -${mesNum} `; // Formato 27-02

        const diasSemana = ['LUNES', 'MARTES', 'MIERCOLES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'SÁBADO', 'DOMINGO'];
        const diaSemanaHoy = diasSemana[now.getDay() === 0 ? 8 : now.getDay() - 1]; // getDay: 0 es Domingo

        let sheetName = workbook.SheetNames[0];
        let foundMatch = false;

        // 1. Intento: Buscar coincidencia exacta con el día y mes de hoy (ej: "27-02" o "27/02")
        for (const name of workbook.SheetNames) {
            const cleanName = name.replace(/[\/\.]/g, '-'); // Normalizar separadores
            if (cleanName.includes(fechaHoy)) {
                sheetName = name;
                foundMatch = true;
                break;
            }
        }

        // 2. Intento: Si no hay fecha exacta, buscar por el día de la semana de hoy
        if (!foundMatch) {
            for (const name of workbook.SheetNames) {
                if (name.toUpperCase().includes(diaSemanaHoy)) {
                    sheetName = name;
                    foundMatch = true;
                    break;
                }
            }
        }

        // 3. Intento: Fallback a cualquier día de la semana o patrón de fecha
        if (!foundMatch) {
            for (const name of workbook.SheetNames) {
                const upperName = name.toUpperCase();
                if (diasSemana.some(dia => upperName.includes(dia)) || /\d{1,2}[-/.]\d{1,2}/.test(upperName)) {
                    sheetName = name;
                    break;
                }
            }
        }

        console.log("Pestaña seleccionada:", sheetName);
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Data starts at row 4 (index 3). Logic: Pairs of [Product, Price]
        const newData = [];
        for (let i = 3; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;
            for (let j = 0; j < row.length; j += 2) {
                const name = row[j];
                const price = row[j + 1];
                if (name && price !== undefined && String(name).trim() !== "") {
                    newData.push({
                        id: `excel - ${nextExcelId++} `,
                        name: String(name).toUpperCase().trim(),
                        price: formatPrice(price),
                        isManual: false
                    });
                }
            }
        }

        if (newData.length === 0) {
            showStatus(`No se encontraron productos en la pestaña "${sheetName}"`, 'error');
            return;
        }

        allCards = [...allCards.filter(c => c.isManual), ...newData];
        if (searchBox) searchBox.disabled = false;
        renderGrid();
        showStatus(`Cargados ${newData.length} productos de la pestaña "${sheetName}"`, 'success');
    } catch (err) {
        showStatus('Error al procesar el Excel. Verifica el formato.', 'error');
        console.error(err);
    }
}

function formatPrice(val) {
    const num = parseFloat(String(val).replace(/[$,]/g, '').trim());
    return isNaN(num) ? '0.00' : num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function openManualModal(prefill = '') {
    const nameInput = document.getElementById('manual-name');
    const priceInput = document.getElementById('manual-price');
    if (!nameInput || !priceInput) return;
    nameInput.value = prefill;
    priceInput.value = '';
    document.getElementById('manual-modal').style.display = 'flex';
    setTimeout(() => (prefill ? priceInput : nameInput).focus(), 100);
}

function saveManualTicket() {
    const name = document.getElementById('manual-name').value.trim();
    const price = document.getElementById('manual-price').value.trim();

    if (!name || !price) return showStatus('Completa todos los campos', 'error');

    const id = `manual - ${nextManualId++} `;
    allCards.unshift({
        id: id,
        name: name.toUpperCase(),
        price: formatPrice(price),
        isManual: true
    });

    selectedIds.add(id);
    document.getElementById('manual-modal').style.display = 'none';
    if (searchBox) searchBox.disabled = false;
    renderGrid();
}

function toggleSelect(id) {
    if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    updatePrintBtn();
}

function deleteTicket(id) {
    if (confirm('¿Eliminar este ticket?')) {
        allCards = allCards.filter(c => c.id !== id);
        selectedIds.delete(id);
        renderGrid();
    }
}

function updatePrintBtn() {
    if (!printBtn) return;
    const count = selectedIds.size;
    printBtn.disabled = count === 0;
    printBtn.innerHTML = `<i data-lucide="printer"></i> Imprimir ${count} Seleccionados`;
}



function selectColumn(colIndex) {
    if (allCards.length === 0) return;
    const filter = searchBox.value.trim().toLowerCase();

    // IMPORTANTE: Primero filtramos Y LUEGO ORDENAMOS igual que en renderGrid
    let visibleCards = allCards.filter(c => c.name.toLowerCase().includes(filter));
    visibleCards.sort((a, b) => a.name.localeCompare(b.name));

    if (visibleCards.length === 0) return;

    selectedIds.clear();

    visibleCards.forEach((card, index) => {
        // Cálculo directo: 1, 2, 3 en bucle
        const col = (index % 3) + 1;

        if (col === colIndex) {
            selectedIds.add(card.id);
        }
    });

    renderGrid(filter);
    showStatus(`Columna ${colIndex} seleccionada (${selectedIds.size} productos)`, 'success');
}
window.selectColumn = selectColumn;

function renderGrid(filter = '') {
    if (!priceGrid) return;
    const filtered = allCards.filter(c => c.name.toLowerCase().includes(filter));
    priceGrid.innerHTML = '';

    if (filtered.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        priceGrid.style.display = 'none';
        updatePrintBtn();
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    priceGrid.style.display = 'grid';

    // Ordenar productos ALFABÉTICAMENTE para que coincida con la selección
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    filtered.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `price-card ${card.isManual ? 'manual-highlight' : ''}`;
        cardEl.id = card.id;

        const isSelected = selectedIds.has(card.id);
        const today = new Date().toLocaleDateString('es-ES');

        cardEl.innerHTML = `
            <div class="card-header">
                <input type="checkbox" class="checkbox-custom" ${isSelected ? 'checked' : ''} onchange="toggleSelect('${card.id}')">
            </div>
            <div class="card-meta">
                <div class="card-date">${today}</div>
                <div class="card-social">${currentFeria ? currentFeria.handle : ''}</div>
            </div>
            <h3 class="card-title">${card.name}</h3>
            <div class="card-price">
                <span class="currency">Bs</span>
                <span class="price-value">${card.price}</span>
            </div>
            <div class="card-actions">
                <button class="action-btn" onclick="printSingle('${card.id}')" title="Imprimir solo este"><i data-lucide="printer" style="width: 14px;"></i></button>
                <button class="action-btn delete" onclick="deleteTicket('${card.id}')" title="Eliminar"><i data-lucide="trash-2" style="width: 14px;"></i></button>
            </div>
        `;
        priceGrid.appendChild(cardEl);
    });

    if (window.lucide) lucide.createIcons();
    updatePrintBtn();
}

function showStatus(msg, type) {
    if (!statusMsg) return;
    statusMsg.textContent = msg;
    statusMsg.style.color = type === 'error' ? '#ef4444' : '#10b981';
    setTimeout(() => { if (statusMsg.textContent === msg) statusMsg.textContent = ''; }, 3000);
}

function handlePrint() {
    const filteredSelected = allCards.filter(c => selectedIds.has(c.id));
    if (filteredSelected.length === 0) return;
    openPrintWindow(filteredSelected);
}

function printSingle(id) {
    const cardData = allCards.find(c => c.id === id);
    if (cardData) {
        openPrintWindow([cardData]);
    }
}

function buildTicketHtml(card, today, feriaHandle) {
    var fontSize = '2.8rem';
    if (card.name.length > 15) fontSize = '2.4rem';
    if (card.name.length > 25) fontSize = '2rem';
    if (card.name.length > 35) fontSize = '1.8rem';

    var h = '';
    // QUITADO EL FONDO BLANCO (background:white) PARA QUE SEA TRANSPARENTE
    h += '<div style="width:100%;color:black;text-align:center;display:table;margin:0;padding:0;border:none;height:80mm;page-break-after:always;">';
    h += '<div style="display:table-cell;vertical-align:middle;text-align:center;padding:3mm 5mm;">';
    h += '<div style="text-align:center;margin-bottom:2mm;">';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:1.1rem;font-weight:700;color:black;line-height:1.3;">' + today + '</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:1.1rem;font-weight:700;color:black;line-height:1.3;">' + feriaHandle + '</div>';
    h += '</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:' + fontSize + ';font-weight:900;color:black;text-align:center;line-height:1.1;text-transform:uppercase;margin-bottom:2mm;">' + card.name + '</div>';
    h += '<div style="text-align:center;">';
    h += '<span style="font-family:Montserrat,sans-serif;font-size:2.5rem;font-weight:900;color:black;vertical-align:baseline;">Bs</span>';
    h += '<span style="font-family:Montserrat,sans-serif;font-size:7.5rem;font-weight:900;color:black;line-height:0.9;"> ' + card.price + '</span>';
    h += '</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:0.85rem;font-weight:700;color:black;font-style:italic;text-align:center;margin-top:2mm;">¡Gracias por tu visita! Que tengas un excelente día.</div>';
    h += '</div>';
    h += '</div>';
    return h;
}

function openPrintWindow(cardsToPrint) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Por favor, permite los pop-ups para imprimir.');
        return;
    }

    const today = new Date().toLocaleDateString('es-ES');
    const feriaHandle = currentFeria ? currentFeria.handle : '';

    let ticketsHtml = '';
    cardsToPrint.forEach(function (card) {
        ticketsHtml += buildTicketHtml(card, today, feriaHandle);
    });

    var html = '<!DOCTYPE html><html><head><title>Imprimir Tickets</title>';
    html += '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap">';
    html += '<style>';
    html += '@page { size: 210mm 80mm; margin: 0 !important; }';
    html += '* { margin: 0; padding: 0; box-sizing: border-box; }';
    html += 'body { background: white; width: 100%; margin: 0; padding: 0; }';
    html += '</style>';
    html += '</head><body>';
    html += ticketsHtml;
    html += '<script>window.onload=function(){setTimeout(function(){window.print(); window.close();}, 500)};<\/script>';
    html += '</body></html>';

    printWindow.document.write(html);
    printWindow.document.close();
}

window.toggleSelect = toggleSelect;
window.deleteTicket = deleteTicket;
window.printSingle = printSingle;
window.handlePrint = handlePrint;

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('SW Registered'))
        .catch(err => console.log('SW Error:', err));
}


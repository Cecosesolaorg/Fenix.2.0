/**
 * Main Initialization and Event Setup
 */

document.addEventListener('DOMContentLoaded', () => {
    if (priceGrid) {
        initTheme();
        initDate();
        initFeria();
        setupEventListeners();
        initPresets();
        if (window.lucide) lucide.createIcons();
    }
});

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
    if (closeManual) closeManual.onclick = () => manualModal.style.display = 'none';

    const saveManual = document.getElementById('save-manual-btn');
    if (saveManual) saveManual.onclick = saveManualTicket;

    const closePresets = document.getElementById('close-presets-btn');
    if (closePresets) closePresets.onclick = () => presetsModal.style.display = 'none';

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

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('SW Registered'))
        .catch(err => console.log('SW Error:', err));
}

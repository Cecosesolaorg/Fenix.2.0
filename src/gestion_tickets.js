/**
 * Ticket Management Logic
 */

let dollarSelectedIds = new Set();


function openManualModal(prefill = '') {
    if (!manualNameInput || !manualPriceInput) return;
    manualNameInput.value = prefill;
    manualPriceInput.value = '';
    manualModal.style.display = 'flex';
    setTimeout(() => (prefill ? manualPriceInput : manualNameInput).focus(), 100);
}

function toggleDollar(id) {
    if (dollarSelectedIds.has(id)) {
        dollarSelectedIds.delete(id);
    } else {
        dollarSelectedIds.add(id);
    }
    renderGrid(searchBox ? searchBox.value.trim().toLowerCase() : '');
}

function toggleAllDollar() {
    const manualDolarInput = document.getElementById('manual-dolar');
    if (!manualDolarInput || !manualDolarInput.value) {
        showStatus ? showStatus('Primero ingresa un precio para el dólar', 'error') : alert('Primero ingresa un precio para el dólar');
        return;
    }

    const filter = searchBox ? searchBox.value.trim().toLowerCase() : '';
    const visibleCards = allCards.filter(c => c.name.toLowerCase().includes(filter));

    // Check if every visible card has dollar selected
    let allSelected = visibleCards.length > 0 && visibleCards.every(c => dollarSelectedIds.has(c.id));

    if (allSelected) {
        visibleCards.forEach(c => dollarSelectedIds.delete(c.id));
    } else {
        visibleCards.forEach(c => dollarSelectedIds.add(c.id));
    }
    renderGrid(filter);
}


function saveManualTicket() {
    const name = manualNameInput.value.trim();
    const price = manualPriceInput.value.trim();

    if (!name || !price) return showStatus('Completa todos los campos', 'error');

    const id = `manual - ${nextManualId++} `;
    allCards.unshift({
        id: id,
        name: name.toUpperCase(),
        price: formatPrice(price),
        isManual: true
    });

    selectedIds.add(id);
    manualModal.style.display = 'none';
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

    let visibleCards = allCards.filter(c => c.name.toLowerCase().includes(filter));
    visibleCards.sort((a, b) => a.name.localeCompare(b.name));

    if (visibleCards.length === 0) return;

    selectedIds.clear();
    visibleCards.forEach((card, index) => {
        const col = (index % 3) + 1;
        if (col === colIndex) {
            selectedIds.add(card.id);
        }
    });

    renderGrid(filter);
    showStatus(`Columna ${colIndex} seleccionada (${selectedIds.size} productos)`, 'success');
}

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
                <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 700; color: ${dollarSelectedIds.has(card.id) ? '#16a34a' : '#94a3b8'}; user-select: none;">
                    <input type="checkbox" ${dollarSelectedIds.has(card.id) ? 'checked' : ''} onchange="toggleDollar('${card.id}')" style="margin:0; width: 14px; height: 14px; cursor: pointer;">
                    Incluir $
                </label>
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

    // Calculate dollar badge if manual rate was entered AND product is selected for dollar
    const manualDolarInput = document.getElementById('manual-dolar');
    let dollarCorner = '';

    if (manualDolarInput && manualDolarInput.value && dollarSelectedIds.has(card.id)) {
        const rawDollar = parseFloat(manualDolarInput.value);
        if (!isNaN(rawDollar) && rawDollar > 0) {
            const rawBolivar = parseFloat(String(card.price).replace(/\./g, '').replace(',', '.'));
            if (!isNaN(rawBolivar)) {
                const dollarValue = rawBolivar / rawDollar;
                const formattedDollar = dollarValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                dollarCorner = `<div style="font-family:Montserrat,sans-serif;font-size:2.2rem;font-weight:900;color:black;text-align:center;margin-top:1mm;line-height:1;">$ ${formattedDollar}</div>`;
            }
        }
    }

    var h = '';
    h += '<div style="width:100%;color:black;text-align:center;display:table;margin:0;padding:0;border:none;height:80mm;page-break-after:always;">';
    h += '<div style="display:table-cell;vertical-align:middle;text-align:center;padding:3mm 5mm;">';
    h += '<div style="text-align:center;margin-bottom:2mm;">';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:1.1rem;font-weight:700;color:black;line-height:1.3;">' + today + '</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:1.1rem;font-weight:700;color:black;line-height:1.3;">' + feriaHandle + '</div>';
    h += '</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:' + fontSize + ';font-weight:900;color:black;text-align:center;line-height:1.1;text-transform:uppercase;margin-bottom:2mm;">' + card.name + '</div>';
    h += '<div style="text-align:center;">';
    h += '<span style="font-family:Montserrat,sans-serif;font-size:2.5rem;font-weight:900;color:black;vertical-align:baseline;">Bs</span>';
    h += '<span style="font-family:Montserrat,sans-serif;font-size:6rem;font-weight:900;color:black;line-height:0.9;"> ' + card.price + '</span>';
    h += '</div>';
    h += dollarCorner;
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

// Global exposure for HTML onclick attributes
window.toggleSelect = toggleSelect;
window.deleteTicket = deleteTicket;
window.printSingle = printSingle;
window.handlePrint = handlePrint;
window.selectColumn = selectColumn;
window.saveManualTicket = saveManualTicket;
window.toggleDollar = toggleDollar;
window.toggleAllDollar = toggleAllDollar;

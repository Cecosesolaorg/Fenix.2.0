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
            <div class="card-price" title="Haz clic en el precio para editarlo">
                <span class="currency">Bs</span>
                <span class="price-value" onclick="editPrice('${card.id}', this)" style="cursor: pointer; border-bottom: 2px dashed #94a3b8; padding-bottom: 1px;">${card.price}</span>
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
    h += '<div style="font-family:Montserrat,sans-serif;font-size:0.85rem;font-weight:700;color:black;font-style:italic;text-align:center;margin-top:2mm;">¡Gracias por tu visita! Que tengas un excelente día.</div>'; h += '<div style="font-family:Montserrat,sans-serif;font-size:0.85rem;font-weight:700;color:black;font-style:italic;text-align:center;margin-top:2mm;">¡Gracias por tu visita! Que tengas un excelente día.</div>';


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

function editPrice(cardId, spanEl) {
    // Don't create a second input if already editing
    if (spanEl.querySelector('input')) return;

    const card = allCards.find(c => c.id === cardId);
    if (!card) return;

    const currentVal = String(card.price).replace(/\./g, '').replace(',', '.');
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '0.01';
    input.value = currentVal !== '0.00' ? currentVal : '';
    input.placeholder = '0.00';
    input.style.cssText = 'width: 120px; font-size: 2.8rem; font-weight: 900; color: black; border: none; border-bottom: 2px solid var(--primary); outline: none; text-align: center; background: transparent;';

    const save = () => {
        const val = input.value.trim();
        if (val && !isNaN(parseFloat(val)) && parseFloat(val) >= 0) {
            card.price = formatPrice(val);
        }
        renderGrid(searchBox ? searchBox.value.trim().toLowerCase() : '');
    };

    input.onblur = save;
    input.onkeydown = (e) => { if (e.key === 'Enter') input.blur(); if (e.key === 'Escape') { input.onblur = null; renderGrid(searchBox ? searchBox.value.trim().toLowerCase() : ''); } };

    spanEl.innerHTML = '';
    spanEl.appendChild(input);
    setTimeout(() => input.focus(), 50);
}

window.editPrice = editPrice;

// ============================================================
//  PRODUCTOS DE CAJA  (Feria del Este)
// ============================================================

let cajaItems = []; // { name, price }

function openCajaModal() {
    if (typeof CAJA_PRODUCTS === 'undefined') return;

    // Always rebuild modal for fresh state
    let modal = document.getElementById('caja-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'caja-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:780px;width:95%;padding:0;overflow:hidden;border-radius:18px;">
        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:1.2rem 1.5rem;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:1.6rem;">📦</span>
              <h2 style="font-weight:900;color:white;font-size:1.3rem;margin:0;">Productos de Caja</h2>
            </div>
            <p style="font-size:0.78rem;color:rgba(255,255,255,0.75);margin:4px 0 0 38px;">Ingresa el precio de cada producto y presiona Imprimir</p>
          </div>
          <button id="close-caja-btn" style="background:rgba(255,255,255,0.15);border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem;font-weight:900;">&times;</button>
        </div>

        <!-- PRODUCT LIST -->
        <div id="caja-product-list" style="padding:1rem 1.2rem;display:flex;flex-direction:column;gap:0;max-height:62vh;overflow-y:auto;"></div>

        <!-- FOOTER -->
        <div style="padding:1rem 1.5rem;background:#f8fafc;border-top:2px solid #e2e8f0;display:flex;gap:1rem;justify-content:flex-end;align-items:center;">
          <button id="caja-cancel-btn" style="background:#e2e8f0;color:#475569;border:none;border-radius:10px;padding:0.7rem 1.4rem;font-weight:700;cursor:pointer;font-size:0.95rem;">Cancelar</button>
          <button id="caja-print-btn" style="background:linear-gradient(135deg,#dc2626,#b91c1c);color:white;border:none;border-radius:10px;padding:0.7rem 1.6rem;font-weight:900;cursor:pointer;font-size:1rem;display:flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(220,38,38,0.35);">
            <i data-lucide="printer" style="width:18px;height:18px;"></i> Imprimir Lista de Caja
          </button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    document.getElementById('close-caja-btn').onclick = closeCajaModal;
    document.getElementById('caja-cancel-btn').onclick = closeCajaModal;
    document.getElementById('caja-print-btn').onclick = printCajaList;

    // Populate product rows
    const list = document.getElementById('caja-product-list');
    cajaItems = [];

    CAJA_PRODUCTS.forEach((name, i) => {
        cajaItems.push({ name: name.toUpperCase(), price: '' });
        const row = document.createElement('div');
        row.style.cssText = `
            display:flex;align-items:center;gap:1rem;
            padding:0.55rem 0.8rem;
            background:${i % 2 === 0 ? '#f8fafc' : 'white'};
            border-bottom:1px solid #e2e8f0;
            border-radius:6px;
        `;
        row.innerHTML = `
          <span style="flex:1;font-weight:700;font-size:0.92rem;color:#1e293b;letter-spacing:0.01em;">${name.toUpperCase()}</span>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:0.8rem;font-weight:800;color:#64748b;">Bs</span>
            <input type="number" min="0" step="1" placeholder="0"
              data-caja-index="${i}"
              style="width:110px;padding:0.5rem 0.6rem;border:2px solid #e2e8f0;border-radius:9px;font-size:1.05rem;font-weight:800;text-align:center;color:#1e293b;background:white;outline:none;transition:border .2s;"
              onfocus="this.style.borderColor='#dc2626'"
              onblur="this.style.borderColor='#e2e8f0'"
              oninput="cajaItems[${i}].price = this.value">
          </div>`;
        list.appendChild(row);
    });

    modal.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
}


function closeCajaModal() {
    const modal = document.getElementById('caja-modal');
    if (modal) modal.style.display = 'none';
}

function formatCajaPrice(val) {
    const n = parseFloat(String(val).replace(/,/g, '.'));
    if (isNaN(n)) return '';
    return n.toLocaleString('es-VE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function printCajaList() {
    // Solo productos con precio mayor a 0
    const items = cajaItems.filter(c => {
        const p = parseFloat(String(c.price).trim());
        return !isNaN(p) && p > 0;
    });

    if (items.length === 0) {
        alert('Ingresa al menos un precio para imprimir.');
        return;
    }
    closeCajaModal();

    const printWin = window.open('', '_blank');
    if (!printWin) { alert('Por favor, permite los pop-ups para imprimir.'); return; }

    const today = new Date().toLocaleDateString('es-ES');

    let rows = '';
    const half = Math.ceil(items.length / 2);

    for (let i = 0; i < half; i++) {
        const leftItem = items[i];
        const rightItem = items[i + half];

        const buildCol = (it) => {
            if (!it) return '<td class="c-name"></td><td class="c-price"></td>';
            const priceRaw = parseFloat(String(it.price).trim());
            const price = (!isNaN(priceRaw) && priceRaw > 0) ? formatCajaPrice(it.price) : '0';
            return `<td class="c-name">${it.name}</td><td class="c-price">${price}</td>`;
        };

        rows += `<tr>
          ${buildCol(leftItem)}
          ${buildCol(rightItem)}
        </tr>`;
    }

    const html = `<!DOCTYPE html><html><head><title>Caja - Feria del Este</title>
    <style>
      @page { size: landscape; margin: 4mm; }
      * { margin:0; padding:0; box-sizing:border-box; }
      body {
        margin: 0; padding: 4mm;
        background: white; 
        font-family: Arial, Helvetica, sans-serif;
      }
      table { width: max-content; margin: 0 auto; border-collapse: collapse; }
      td { 
        border: 1px solid #000; 
        padding: 3mm 4mm; 
        vertical-align: middle;
        font-size: 13pt;
        font-weight: 900;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }
      .c-name { width: auto; }
      .c-price { width: auto; text-align: right; }
    </style></head><body>
      <table>
        ${rows}
      </table>
    <script>
      window.onload = function() {
        setTimeout(function(){ window.print(); window.close(); }, 400);
      };
    <\/script>
    </body></html>`;

    printWin.document.write(html);
    printWin.document.close();
}


window.openCajaModal = openCajaModal;
window.closeCajaModal = closeCajaModal;
window.printCajaList = printCajaList;


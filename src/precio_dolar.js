/**
 * BCV Exchange Rate Logic
 */

async function fetchTasaBCV() {
    try {
        const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        const data = await response.json();
        const rate = data.promedio;
        tasaBCV = rate;

        saveRateToHistory(rate);
        localStorage.setItem('tasaBCV', rate);
        return rate;
    } catch (error) {
        console.error('Error fetching BCV rate:', error);
    }
}

function updateBCVManual() {
    const newRate = prompt("Ingresa el precio del dólar BCV manual:", tasaBCV);
    if (newRate !== null) {
        const rateNum = parseFloat(newRate);
        if (!isNaN(rateNum) && rateNum > 0) {
            tasaBCV = rateNum;
            saveRateToHistory(rateNum);
            showStatus('Tasa BCV actualizada manualmente', 'success');
        }
    }
}

function saveRateToHistory(rate) {
    const timestamp = new Date().getTime();
    if (bcvHistory.length > 0 && bcvHistory[0].rate === rate) return;

    bcvHistory.unshift({ rate, timestamp });
    bcvHistory = bcvHistory.slice(0, 10);
    localStorage.setItem('bcvHistory', JSON.stringify(bcvHistory));
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

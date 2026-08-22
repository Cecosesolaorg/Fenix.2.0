const excelFile = document.getElementById('excelFile');
const priceList = document.getElementById('priceList');
const message = document.getElementById('message');
const printButton = document.getElementById('printButton');
const placeholder = document.getElementById('placeholder');
const searchBox = document.getElementById('searchBox');
const placeholderContainer = document.getElementById('placeholder-container');
const currentDateDisplay = document.getElementById('current-date-display');
const mainTitle = document.getElementById('mainTitle'); // Nuevo elemento para el título
const themeToggleButton = document.getElementById('themeToggleButton');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const manualModal = document.getElementById('manualModal');
const presetsModal = document.getElementById('presetsModal');
const presetsGrid = document.getElementById('presetsGrid');
const modalError = document.getElementById('modalError');
const feriaSelectionModal = document.getElementById('feriaSelectionModal'); // Nuevo elemento del modal
const helpModal = document.getElementById('helpModal'); // NUEVO: Elemento del modal de ayuda

// Elementos de contenido de columnas
const colContent1 = document.getElementById('column-content-1');
const colContent2 = document.getElementById('column-content-2');
const colContent3 = document.getElementById('column-content-3');

// Elementos de botones de columna
const colBtn1 = document.getElementById('print-col-1-btn');
const colBtn2 = document.getElementById('print-col-2-btn');
const colBtn3 = document.getElementById('print-col-3-btn');

// Constantes y Estado de la Feria
const FERIAS = {
    'centro': { name: 'Feria del Centro', handleSuffix: ' | FERIA DEL CENTRO' },
    'este': { name: 'Feria del Este', handleSuffix: ' | FERIA DEL ESTE' },
    'ruiz': { name: 'Feria de Ruiz Pineda', handleSuffix: ' | FERIA DE RUIZ PINEDA' }
};
const DEFAULT_FERIA_ID = 'este';
const BASE_SOCIAL_HANDLE = " <strong> 🅾@redcecosesola";

// LISTA DE PRODUCTOS PREDEFINIDOS (Extraída de la imagen)
const PRESET_PRODUCTS = [
    ¡Claro! Convertir una lista de texto a un formato de JavaScript es la mejor forma de manipular estos datos en una aplicación o sitio web.

Dependiendo de lo que necesites hacer, lo más útil suele ser un Array de strings (para una lista simple) o un Array de objetos (si piensas agregarles precios o categorías después).

Aquí tienes las dos opciones:

1. Array de Strings (Lista simple)
Ideal si solo necesitas mostrar los nombres o usarlos para un buscador básico.

JavaScript
const inventarioProductos = [
  "ACEITE DE COCO 180ML COCONUT",
  "ACEITE DE COCO 300ML",
  "ACEITE DE OLIVA CAPRI",
  "ACEITUNA RELLENA GIRALDA",
  "AFRECHO",
  "AGUACATE",
  "AJO CRIOLLO",
  "AJO PELADO",
  "ARANDANOS",
  "AVENA 8 DE MARZO",
  "AZUCAR MORENA",
  "BICARBONATO DE SODIO",
  "BOCADILLO DE GUAYABA",
  "BOCADILLO DE PLATANO",
  "BOROJO",
  "CAFÉ LO NUESTRO",
  "CAFÉ MATILDE",
  "CAMBUR",
  "CASABE",
  "CREMIGURT GRANDE GRIEGO",
  "CREMIGURT PEQUEÑO GRIEGO",
  "CEBOLLA MORADA",
  "CHAMPIÑON BANDEJA 200GR",
  "CHAMPIÑON DE VIDRIO 500GR",
  "CHIA PESADA",
  "CHOCOLATE ARTESANAL",
  "CIRUELA CRIOLLA",
  "CIRUELA IMPORTADA",
  "CURCUMA",
  "DURAZNO",
  "ESPINACA PAQUETE",
  "FRESAS",
  "FRESAS CONGELADA",
  "GRANOLA",
  "HUEVOS DE CODORNIZ",
  "JENGIBRE",
  "JUGO JUSTY",
  "KIWI",
  "LECHE DESLACTOSADA",
  "LIMON",
  "LULO",
  "MANDARINA CRIOLLA",
  "MANDARINA IMPORTADA",
  "MANI 200GR JUAN MARTINEZ",
  "MANI 85 JUAN MARTINEZ",
  "MANI MIXTO 100GR",
  "MANI MIXTO 200GR",
  "MANI MIXTO 500GR",
  "MANI SALADO Y NATURAL 100GR",
  "MANI SALADO Y NATURAL 200GR",
  "MANZANA AMARRILLA",
  "MANZANA ROJA 150",
  "MANZANA VERDE 100",
  "MANZANA VERDE 113",
  "MIEL SAN CARLOS",
  "MIGURT",
  "MIXTURA GRD",
  "MIXTURA PEQ",
  "MORA CONGELADA",
  "NARANJA IMPORTADA",
  "NARANJA TANYELO",
  "OBLEA",
  "ONOTO",
  "PALMERITAS Y PASTELITOS",
  "PAN ARABE",
  "PAN INTEGRAL",
  "PANELA DULCE",
  "PAPA COLOMBIANA",
  "PARCHITA",
  "PASA",
  "PASTA INTEGRAL",
  "PERA",
  "PIMENTON ROJO",
  "PITAHAYA AMARILLA/ROJA",
  "PULPA DE GUANABANA",
  "PULPA DE DURAZNO ENTROSO",
  "PULPA DE DURAZNO ETNA",
  "PULPA DE PARCHITA",
  "QUINOA PESADA",
  "REFRESCO GLUP",
  "SACOS",
  "SACOS PEQUEÑO",
  "TAMARINDO",
  "TOMATE",
  "TOMATE DE ARBOL",
  "TORTILLA DE MAIZ",
  "TURRON",
  "UCHUA",
  "UVA CRIOLLA",
  "UVA IMPORTADA",
  "VAINILLA",
  "VINAGRE DE MANZANA"
];
let currentFeria = null; // Se inicializa en init()
const CURRENCY_SYMBOL = "Bs";
const MAX_RETRIES = 3;

// ESTADO GLOBAL para almacenar datos y selecciones
let allPriceCards = [];
let selectedTickets = new Set(); // ID's de tickets seleccionados
let nextManualId = 10000; // Para tickets generados manualmente
let nextExcelId = 1; // Para tickets generados del Excel

/**
 * Lógica de Selección de Feria (NUEVO)
 */
function initFeriaSelection() {
    const savedFeriaId = localStorage.getItem('feriaSelection');

    if (savedFeriaId && FERIAS[savedFeriaId]) {
        // Si ya hay una selección guardada, la cargamos
        currentFeria = FERIAS[savedFeriaId];
        feriaSelectionModal.classList.remove('open');
    } else {
        // Si no hay selección, abrimos el modal
        currentFeria = FERIAS[DEFAULT_FERIA_ID]; // Inicializa con un default por si acaso
        feriaSelectionModal.classList.add('open');
    }
    updateFeriaDisplay();
}

function selectFeria(feriaId) {
    if (FERIAS[feriaId]) {
        currentFeria = FERIAS[feriaId];
        localStorage.setItem('feriaSelection', feriaId);
        updateFeriaDisplay();

        // Cerrar modal con transición
        feriaSelectionModal.classList.remove('open');

        // Si ya hay precios cargados, regenerar para que muestren el nuevo handle
        if (allPriceCards.length > 0) {
            renderFilteredLabels(searchBox.value.toLowerCase().trim());
            displayMessage(`Feria actualizada a "${currentFeria.name}". El handle en los tickets ha cambiado.`, 'info');
        } else {
            displayMessage(`Feria seleccionada: "${currentFeria.name}".`, 'info');
        }
    }
}
window.selectFeria = selectFeria;

function updateFeriaDisplay() {
    if (currentFeria) {
        mainTitle.textContent = `  ${currentFeria.name}`;
    } else {
        mainTitle.textContent = ` `;
    }
}

// ==========================================
// LÓGICA DE PRESETS (FRUTERÍA)
// ==========================================

function initPresetsGrid() {
    presetsGrid.innerHTML = '';
    PRESET_PRODUCTS.forEach(product => {
        const btn = document.createElement('button');
        btn.className = "p-3 bg-blue-50 text-blue-800 text-sm font-bold rounded shadow hover:bg-blue-100 hover:scale-105 transition transform dark-mode:bg-slate-600 dark-mode:text-blue-200 dark-mode:hover:bg-slate-500 uppercase";
        btn.textContent = product;
        btn.onclick = () => selectPresetProduct(product);
        presetsGrid.appendChild(btn);
    });
}

function openPresetsModal() {
    initPresetsGrid();
    presetsModal.classList.add('open');
}
window.openPresetsModal = openPresetsModal;

function closePresetsModal() {
    presetsModal.classList.remove('open');
}
window.closePresetsModal = closePresetsModal;

function selectPresetProduct(productName) {
    closePresetsModal();
    // Abrir el modal manual
    openManualModal();
    // Pre-llenar el nombre
    document.getElementById('productName').value = productName.toUpperCase();
    // Enfocar directamente en el precio para que sea rápido
    setTimeout(() => {
        const priceInput = document.getElementById('productPrice');
        priceInput.focus();
        priceInput.select();
    }, 300);
}

/**
 * Lógica del Modal Manual
 */
function openManualModal() {
    // Limpiar formulario y errores
    document.getElementById('manualEntryForm').reset();
    modalError.classList.add('hidden');
    // Abrir modal con transición
    manualModal.classList.add('open');
    // Foco en el primer campo por defecto
    setTimeout(() => document.getElementById('productName').focus(), 300);
}
window.openManualModal = openManualModal;

function closeManualModal() {
    // Cerrar modal con transición
    manualModal.classList.remove('open');
}
window.closeManualModal = closeManualModal;

/**
 * Lógica del Modal de Ayuda (NUEVO)
 */
function openHelpModal() {
    helpModal.classList.add('open');
}
window.openHelpModal = openHelpModal;

function closeHelpModal() {
    helpModal.classList.remove('open');
}
window.closeHelpModal = closeHelpModal;

function generateManualTicket() {
    const product = document.getElementById('productName').value.trim();
    const priceStr = document.getElementById('productPrice').value.trim();

    if (!product || !priceStr) {
        modalError.textContent = "Por favor, complete ambos campos.";
        modalError.classList.remove('hidden');
        return;
    }

    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) {
        modalError.textContent = "El precio debe ser un número válido y positivo.";
        modalError.classList.remove('hidden');
        return;
    }

    modalError.classList.add('hidden');
    closeManualModal();

    // 1. Generar nuevo ID y formatear precio
    const ticketId = `manual-card-${nextManualId++}`;
    const formattedPrice = price.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const newCardData = {
        id: ticketId,
        product: product.toUpperCase(),
        formattedPrice: formattedPrice,
        isManual: true // Etiquetar como manual
    };

    // 2. Agregar a la lista global de tarjetas y seleccionar
    // Insertamos AL PRINCIPIO para que se vea de una vez
    allPriceCards.unshift(newCardData);
    selectedTickets.add(ticketId); // Se selecciona automáticamente para imprimir

    // 3. Renderizar la nueva lista (manteniendo el filtro si existe)
    if (allPriceCards.length > 0) {
        placeholderContainer.classList.add('hidden');
        priceList.classList.remove('hidden');
        searchBox.disabled = false;
    }

    renderFilteredLabels(searchBox.value.toLowerCase().trim());

    // 4. Mostrar mensaje
    displayMessage(`Ticket manual para "${product.toUpperCase()}" generado.`, 'info');

    // 5. Activar la advertencia de recarga si hay precios
    checkAndSetUnloadWarning();

    // Desplazarse al nuevo ticket
    setTimeout(() => {
        const newTicketElement = document.getElementById(ticketId);
        if (newTicketElement) {
            newTicketElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Animación visual para destacar el ticket
            newTicketElement.style.boxShadow = '0 0 15px 5px rgba(255, 165, 0, 0.7)';
            setTimeout(() => newTicketElement.style.boxShadow = '', 1000);
        }
    }, 50);
}
window.generateManualTicket = generateManualTicket;

/**
 * Elimina un ticket por su ID (manual o de Excel).
 * @param {string} ticketId - El ID del ticket a eliminar.
 */
function deleteTicket(ticketId) {
    const isManual = ticketId.startsWith('manual-');
    const confirmationMsg = isManual
        ? "¿Compañero Estás seguro de que deseas eliminar este ticket manual?"
        : "¿Estás seguro de quitar este producto de la lista de impresión? Deberás volver a cargar el Excel para recuperarlo.";

    // Confirmación antes de eliminar
    if (!confirm(confirmationMsg)) {
        return;
    }

    // 1. Eliminar de la lista global de tarjetas
    allPriceCards = allPriceCards.filter(card => card.id !== ticketId);

    // 2. Asegurarse de que esté deseleccionado
    selectedTickets.delete(ticketId);

    // 3. Re-renderizar la vista
    renderFilteredLabels(searchBox.value.toLowerCase().trim());

    displayMessage(`Ticket eliminado con éxito.`, 'info');

    // 4. Si se eliminaron todos los tickets, desactiva la advertencia
    checkAndSetUnloadWarning();

    if (allPriceCards.length === 0) {
        placeholderContainer.classList.remove('hidden');
        priceList.classList.add('hidden');
        searchBox.disabled = true;
    }
}
window.deleteTicket = deleteTicket; // Unificamos el nombre a nivel global

// Mantenemos la función deleteManualTicket como alias para retrocompatibilidad
window.deleteManualTicket = (ticketId) => deleteTicket(ticketId);
// Creamos la función deleteExcelTicket para ser usada en el HTML
window.deleteExcelTicket = (ticketId) => deleteTicket(ticketId);

/**
 * FUNCIÓN DE MODO NOCTURNO
 */
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcons(isDarkMode);
}

function updateThemeIcons(isDarkMode) {
    if (isDarkMode) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let isDarkMode = false;
    if (savedTheme === 'dark') {
        isDarkMode = true;
    } else if (savedTheme === null && prefersDark) {
        isDarkMode = true;
    }

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcons(isDarkMode);
}

// Aplicar el tema al cargar la página
applySavedTheme();

// Listener para el botón de tema
themeToggleButton.addEventListener('click', toggleTheme);

/**
 * Obtiene la fecha actual en formato dd/mm/aaaa.
 * @returns {string} La fecha formateada.
 */
function getCurrentDateFormatted(includePrefix = true) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
    const year = now.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    return includePrefix ? `Fecha del Dia: ${dateStr}` : dateStr;
}

// Inicializar la fecha al cargar la página en la cabecera principal
currentDateDisplay.textContent = getCurrentDateFormatted();


/**
 * Genera el HTML para una tarjeta de precio.
 * @param {object} data - Datos del ticket (id, product, formattedPrice, isManual).
 * @param {boolean} isChecked - Si el checkbox debe estar marcado.
 * @returns {string} HTML de la tarjeta de precio.
 */
function createPriceCardHtml(data, isChecked) {
    const checkedAttr = isChecked ? 'checked' : '';
    const ticketId = data.id;
    const todayDate = getCurrentDateFormatted(false); // Obtener solo la fecha

    const isManual = data.isManual;

    // Estilo para diferenciar tarjetas manuales
    const cardClass = isManual ? 'border-2 border-yellow-500' : 'border-2 border-green-500/0 hover:border-green-500/50';

    // Botón de Eliminación (Depende si es manual o de Excel)
    let deleteButtonHtml = '';
    let deleteButtonClass = '';
    let deleteTitle = '';

    if (isManual) {
        deleteButtonClass = 'delete-manual-button bg-red-500 hover:bg-red-600 focus:ring-red-400';
        deleteTitle = 'Eliminar este ticket manual';
        deleteButtonHtml = `
            <button onclick="deleteTicket('${ticketId}')" 
                    class="${deleteButtonClass} text-white p-1.5 rounded-full shadow-lg focus:outline-none focus:ring-2 transition"
                    title="${deleteTitle}">
                <!-- Icono de Bote de Basura -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clip-rule="evenodd" />
                    </svg>
            </button>
        `;
    } else {
        // NUEVO: Botón para eliminar productos cargados del Excel
        deleteButtonClass = 'delete-excel-button bg-gray-500 hover:bg-gray-600 focus:ring-gray-400';
        deleteTitle = 'Quitar de la lista de impresión';
        deleteButtonHtml = `
            <button onclick="deleteTicket('${ticketId}')" 
                    class="${deleteButtonClass} text-white p-1.5 rounded-full shadow-lg focus:outline-none focus:ring-2 transition"
                    title="${deleteTitle}">
                <!-- Icono de Quitar/Cerrar (X) -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
    }

    // Usamos BASE_SOCIAL_HANDLE y el sufijo de la feria actual
    const socialHandleText = `${BASE_SOCIAL_HANDLE}${currentFeria ? currentFeria.handleSuffix : ''}`;

    return `
        <div id="${ticketId}" 
            class="price-card rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-44 relative ${cardClass}">
            
            <!-- CONTROLES DE LA TARJETA (CHECKBOX) -->
            <div class="absolute top-4 left-4 print-controls z-10">
                <input type="checkbox" id="check-${ticketId}" 
                    onchange="toggleTicketSelection('${ticketId}')" 
                    ${checkedAttr}
                    class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark-mode:bg-slate-700 dark-mode:border-slate-500 dark-mode:checked:bg-blue-400 cursor-pointer">
            </div>

            <!-- Botón que imprime SÓLO este ticket -->
            <button onclick="printSingleTicket('${ticketId}')" 
                    class="print-single-button bg-blue-500 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    title="Imprimir solo esta etiqueta">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 4V2a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v5a2 2 0 01-2 2h-2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4H3a2 2 0 01-2-2V6a2 2 0 012-2h2zm10 2H5v3h10V6z" clip-rule="evenodd" />
                </svg>
            </button>
            
            ${deleteButtonHtml} <!-- Botón de eliminación (manual o excel) -->

            <div class="text-center mt-2">
                <!-- FECHA ACTUAL AÑADIDA AQUÍ -->
                <!-- Clase ticket-date y social-handle son ahora más específicas y negras por defecto -->
                <p class="ticket-date text-xs font-bold text-gray-900 mb-0.5">${todayDate}</p> 
                <!-- HANDLE SOCIAL Y SUFIJO DE FERIA -->
                <p class="social-handle text-xs font-medium text-gray-500">${socialHandleText}</p>
                
                <!-- Envolver el H3 en una etiqueta para que el clic grande seleccione/deseleccione -->
                <label for="check-${ticketId}" class="block cursor-pointer">
                    <!-- CLAVE: Grosor font-black y leading-tight para máxima visibilidad y espacio -->
                    <!-- Quitamos text-center de aquí porque ya está en el estilo global -->
                    <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight leading-tight">${data.product}</h3>
                </label>
            </div>
            <!-- Precio se mantiene en text-4xl para ser más pequeño, pero ahora tiene más espacio en la tarjeta h-44 -->
            <div class="text-4xl font-extrabold text-blue-600 w-full flex items-end justify-center pb-1">
                <!-- Clases currency-symbol y price-value para sobrescribir fácilmente en impresión -->
                <!-- NUEVO: Alineación a la izquierda para simular el desplazamiento que quieres -->
                <span class="currency-symbol text-xl font-bold mr-1 text-blue-600">Bs</span>
                <span class="price-value text-blue-600">${data.formattedPrice}</span>
            </div>
        </div>
    `;
}

/**
 * Alterna la selección de un ticket.
 * @param {string} ticketId - El ID único del ticket.
 */
function toggleTicketSelection(ticketId) {
    const checkbox = document.getElementById(`check-${ticketId}`);
    if (checkbox.checked) {
        selectedTickets.add(ticketId);
    } else {
        selectedTickets.delete(ticketId);
    }
    updatePrintButtonState();
}
window.toggleTicketSelection = toggleTicketSelection;

/**
 * Actualiza el texto y estado de los botones de impresión (Principal y Columna).
 */
function updatePrintButtonState() {
    const count = selectedTickets.size;
    const hasVisibleContent = allPriceCards.length > 0;

    // Botón de Impresión Principal
    if (count > 0) {
        printButton.textContent = `2. Imprimir ${count} Seleccionado(s)`;
        printButton.disabled = false;
    } else {
        printButton.textContent = " Imprimir Productos Selecionados";
        printButton.disabled = !hasVisibleContent; // Solo habilitar si hay contenido cargado
    }

    // Botones de Columna: Se habilitan si la lista está cargada y tienen contenido visible
    const isLoaded = hasVisibleContent;
    colBtn1.disabled = !isLoaded || colContent1.children.length === 0;
    colBtn2.disabled = !isLoaded || colContent2.children.length === 0;
    colBtn3.disabled = !isLoaded || colContent3.children.length === 0;

}

/**
 * Imprime solo los tickets seleccionados.
 */
function printSelectedTickets() {
    if (selectedTickets.size === 0) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Tickets Seleccionados</title>');

    // Incluir estilos para impresión selectiva
    printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
    printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900;1000&display=swap" rel="stylesheet">');
    printWindow.document.write(`<style>
        /* Márgenes de página a la configuración predeterminada del usuario (0mm, 6.5mm, 27mm, 0mm) */
        @page { 
            size: 210mm 80mm; /* Intercambiado para forzar paisaje */
            margin: 6.5mm 27mm 0mm 0mm !important; /* top right bottom left */
            orientation: landscape; /* FORZAR HORIZONTAL */
        }

        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #fff; color: #000; }
        .price-card { 
            border: 1px dashed #ccc !important; 
            box-shadow: none !important;
            page-break-inside: avoid;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            /* AUMENTADO: Consistencia con la vista de pantalla */
            height: 11rem !important; 
            width: 100%;
            margin-bottom: 0.5rem; 
            background-color: #ffffff !important;
            color: #000000 !important;
            /* APLICACIÓN DE CORTE (SALTO DE PÁGINA) */
            page-break-after: always !important; 
        }
        
        /* INICIO ESTILOS AÑADIDOS PARA MAYOR GROSOR Y TAMAÑO EN IMPRESIÓN */
        /* Aseguramos NEGRO PURO y MÁXIMO GROSOR en todo */
        .price-card h3 { 
            color: #000000 !important; 
            font-size: 1.8rem !important; 
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
            line-height: 1.1 !important; /* Interlineado ajustado */
            text-align: center !important; /* Asegurar centrado */
        }
        
        .price-card > div:last-child {
            color: #000000 !important;
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
            /* NUEVO: Justificación para el precio */
            justify-content: flex-start !important; /* Alinear el grupo Bs + Precio a la izquierda */
            padding-left: 0.5rem !important; /* Un poco de margen a la izquierda del Bs */
        }
        
        /* Símbolo de la moneda (Bs): Negro y Grosor Extra */
        .price-card .currency-symbol {
             color: #000000 !important;
             font-weight: 1000 !important; /* MÁXIMO GROSOR DEL INTER FONT */
             /* NUEVO: Reduce tamaño y establece un ancho fijo */
             font-size: 2rem !important; /* Tamaño más pequeño que el valor */
             width: 2.5rem; /* Ancho fijo para alineación vertical */
             text-align: right;
             padding-top: 2rem !important; /* Mover Bs hacia arriba */
        }
        
        .price-card .price-value {
            font-size: 5rem !important; /* Aumentado a 5rem para GRANDE */
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
            color: #000000 !important;
            line-height: 1 !important;
        }
        
        /* FIN ESTILOS AÑADIDOS */

        /* Ocultar todos los controles de la tarjeta en la impresión */
        .print-single-button, .print-controls, .delete-manual-button, .delete-excel-button { display: none !important; }
        
        /* Fecha y Handle Social: Negro y Máximo Grosor */
        .price-card .ticket-date,
        .price-card .social-handle {
            color: #000000 !important;
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
        }
        
        .ticket-date { display: block !important; } 
    </style>`);
    printWindow.document.write('</head><body>');

    // Construir el contenido HTML solo con los seleccionados
    let printContent = '';
    selectedTickets.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            printContent += element.outerHTML;
        }
    });

    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // CLAVE: Aumentar el tiempo de espera a 500ms para que Tailwind y las fuentes carguen bien.
    printWindow.onload = function () {
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };
}

/**
 * Maneja el evento de impresión global (Todos visibles o Seleccionados).
 */
function handleGlobalPrint() {
    if (selectedTickets.size > 0) {
        printSelectedTickets();
    } else {
        // Si no hay selección, imprime todo lo que es visible (útil después de una búsqueda)
        // Esto usará la regla 'page-break-after: always' del CSS principal @media print
        window.print();
    }
}
window.handleGlobalPrint = handleGlobalPrint;

/**
 * Selecciona todos los tickets visibles en una columna específica.
 * Deselecciona todos los demás tickets primero.
 * @param {number} colIndex - 1, 2, o 3.
 * @returns {number} El número de tickets seleccionados.
 */
function selectColumnTickets(colIndex) {
    const containerId = `column-content-${colIndex}`;
    const container = document.getElementById(containerId);
    if (!container) return 0;

    // 1. Deseleccionar globalmente todos los tickets
    selectedTickets.forEach(id => {
        const checkbox = document.getElementById(`check-${id}`);
        if (checkbox) checkbox.checked = false;
    });
    selectedTickets.clear();

    // 2. Seleccionar todos los visibles en esta columna
    const cards = container.querySelectorAll('.price-card');
    cards.forEach(card => {
        const ticketId = card.id;
        selectedTickets.add(ticketId);
        const checkbox = document.getElementById(`check-${ticketId}`);
        if (checkbox) checkbox.checked = true;
    });

    // 3. Actualizar el estado del botón principal
    updatePrintButtonState();

    return cards.length;
}

/**
 * NUEVA FUNCIÓN: Selecciona una columna SIN imprimir.
 */
function selectColumnOnly(colIndex) {
    const count = selectColumnTickets(colIndex); // Selecciona la columna

    if (count > 0) {
        displayMessage(`Columna ${colIndex} seleccionada. ${count} tickets listos para imprimir. Haga clic en el botón verde.`, 'info');

    } else {
        displayMessage(`La columna ${colIndex} está vacía.`, 'error');
    }
}
window.selectColumnOnly = selectColumnOnly;

/**
 * FUNCIÓN DE IMPRESIÓN DE TICKET INDIVIDUAL (Actualizada con salto de página/corte)
 */
function printSingleTicket(elementId) {
    const ticketElement = document.getElementById(elementId);
    if (!ticketElement) {
        console.error("Elemento no encontrado para imprimir:", elementId);
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Imprimir Etiqueta</title>');
    printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
    printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900;1000&display=swap" rel="stylesheet">');
    printWindow.document.write(`<style>
        /* Márgenes de página a la configuración predeterminada del usuario (0mm, 6.5mm, 27mm, 0mm) */
        @page { 
            size: 210mm 80mm; /* Intercambiado para forzar paisaje */
            margin: 6.5mm 27mm 0mm 0mm !important; /* top right bottom left */
            orientation: landscape; /* FORZAR HORIZONTAL */
        }
        
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #fff; color: #000; }
        .price-card { 
            border: 1px dashed #ccc !important; 
            box-shadow: none !important;
            page-break-inside: avoid;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            /* AUMENTADO: Consistencia con la vista de pantalla */
            height: 11rem !important; 
            width: 100%;
            background-color: #ffffff !important;
            color: #000000 !important;
            /* APLICACIÓN DE CORTE (SALTO DE PÁGINA) */
            page-break-after: always !important;
        }

        /* INICIO ESTILOS AÑADIDOS PARA MAYOR GROSOR Y TAMAÑO EN IMPRESIÓN */
        /* Aseguramos NEGRO PURO y MÁXIMO GROSOR en todo */
        .price-card h3 { 
            color: #000000 !important; 
            font-size: 1.8rem !important; 
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
            line-height: 1.1 !important; /* Interlineado ajustado */
            text-align: center !important; /* Asegurar centrado */
        }
        
        .price-card > div:last-child {
            color: #000000 !important;
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
            /* NUEVO: Justificación para el precio */
            justify-content: flex-start !important; /* Alinear el grupo Bs + Precio a la izquierda */
            padding-left: 0.5rem !important; /* Un poco de margen a la izquierda del Bs */
        }
        
        /* Símbolo de la moneda (Bs): Negro y Grosor Extra */
        .price-card .currency-symbol {
             color: #000000 !important;
             font-weight: 1000 !important; /* MÁXIMO GROSOR DEL INTER FONT */
             /* NUEVO: Reduce tamaño y establece un ancho fijo */
             font-size: 2rem !important; /* Tamaño más pequeño que el valor */
             width: 2.5rem; /* Ancho fijo para alineación vertical */
             text-align: right;
             padding-top: 2rem !important; /* Mover Bs hacia arriba */
        }
        
        .price-card .price-value {
            font-size: 5rem !important; /* Aumentado a 5rem para GRANDE */
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
            color: #000000 !important;
            line-height: 1 !important;
        }
        /* FIN ESTILOS AÑADIDOS */
        
        /* Ocultar todos los controles de la tarjeta en la impresión */
        .print-single-button, .print-controls, .delete-manual-button, .delete-excel-button { display: none !important; }
        
        /* Fecha y Handle Social: Negro y Máximo Grosor */
        .price-card .ticket-date,
        .price-card .social-handle {
            color: #000000 !important;
            font-weight: 1000 !important; /* MÁXIMO GROSOR */
        }
        
        .ticket-date { display: block !important; } 
    </style>`);

    printWindow.document.write('</head><body>');
    printWindow.document.write(ticketElement.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // CLAVE: Aumentar el tiempo de espera a 500ms para que Tailwind y las fuentes carguen bien.
    printWindow.onload = function () {
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

}
window.printSingleTicket = printSingleTicket;

/**
 * Filtra los productos visibles basándose en el texto de búsqueda.
 */
function filterProducts() {
    const searchTerm = searchBox.value.toLowerCase().trim();
    renderFilteredLabels(searchTerm);
}
window.filterProducts = filterProducts;

/**
 * Renderiza los tickets filtrados, regenerando el HTML para mantener el estado de selección.
 * @param {string} searchTerm - El término de búsqueda.
 */
function renderFilteredLabels(searchTerm) {
    // Limpiar contenido actual de las columnas
    colContent1.innerHTML = '';
    colContent2.innerHTML = '';
    colContent3.innerHTML = '';

    let currentColumn = 1;
    const columnContents = { 1: '', 2: '', 3: '' };
    let visibleCount = 0;

    allPriceCards.forEach(cardData => {
        const productName = cardData.product.toLowerCase();

        if (searchTerm === "" || productName.includes(searchTerm)) {
            // Re-generar HTML para incluir el estado de selección
            const isChecked = selectedTickets.has(cardData.id);
            const html = createPriceCardHtml(cardData, isChecked);

            columnContents[currentColumn] += html;
            visibleCount++;

            // Ciclar a la siguiente columna
            currentColumn = (currentColumn % 3) + 1;
        }
    });

    // Insertar el HTML en los contenedores de columna
    colContent1.innerHTML = columnContents[1];
    colContent2.innerHTML = columnContents[2];
    colContent3.innerHTML = columnContents[3];

    // Mostrar/Ocultar placeholder
    if (visibleCount === 0 && searchTerm !== "" && allPriceCards.length > 0) {
        placeholder.textContent = `No se encontraron resultados para "${searchBox.value}".`;
        placeholderContainer.classList.remove('hidden');
        priceList.classList.add('hidden');
    } else if (allPriceCards.length > 0) {
        placeholderContainer.classList.add('hidden');
        priceList.classList.remove('hidden');
    } else {
        placeholderContainer.classList.remove('hidden');
        priceList.classList.add('hidden');
        placeholder.textContent = "Sube un archivo Excel para ver los precios listos para imprimir.";
    }

    // Actualizar el estado de los botones (incluida la selección global)
    updatePrintButtonState();
}

/**
 * Muestra un mensaje de error o advertencia.
 */
function displayMessage(text, type = 'error') {
    message.textContent = text;
    message.className = `text-sm mt-2 p-3 rounded-lg ${type === 'error' ? 'text-red-700 bg-red-100 dark-mode:bg-red-900 dark-mode:text-red-300' : 'text-blue-700 bg-blue-100 dark-mode:bg-blue-900 dark-mode:text-blue-300'}`;
    message.classList.remove('hidden');
}

/**
 * Procesa los datos del archivo Excel (Mantenida).
 */
async function processExcelData(data, retryCount = 0) {
    try {
        // Reiniciar estado de búsqueda y lista
        searchBox.value = '';
        searchBox.disabled = true;

        // Conservar solo los tickets manuales. Los de Excel se re-cargan
        allPriceCards = allPriceCards.filter(card => card.isManual);
        // Mantenemos la selección de los manuales que aún existen
        selectedTickets = new Set(allPriceCards.filter(card => selectedTickets.has(card.id)).map(card => card.id));
        nextExcelId = 1; // Reiniciar contador de ID de Excel

        colContent1.innerHTML = '';
        colContent2.innerHTML = '';
        colContent3.innerHTML = '';

        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) throw new Error("La primera hoja del Excel está vacía.");

        // Lee el archivo asumiendo que los datos comienzan en la fila 4 (índice 3)
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: null });
        if (rawData.length < 4) throw new Error("El archivo no contiene datos a partir de la fila 4.");

        renderPriceLabels(rawData);

    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            console.warn(`Error procesando Excel. Reintentando... (${retryCount + 1})`, error);
            await new Promise(resolve => setTimeout(resolve, 500 * (retryCount + 1)));
            await processExcelData(data, retryCount + 1);
        } else {
            console.error("Fallo al procesar el archivo Excel.", error);
            displayMessage(`Error al leer el archivo: ${error.message}`, 'error');
            updatePrintButtonState(); // Deshabilita botones
            priceList.classList.add('hidden');
            placeholderContainer.classList.remove('hidden');
            placeholder.textContent = "Sube un archivo Excel para ver los precios listos para imprimir.";
        }
    }
}

/**
 * Renderiza la lista de precios, almacenando solo los datos.
 */
function renderPriceLabels(rawData) {
    let validCount = 0;

    // Ignoramos las primeras 3 filas y procesamos a partir de la 4.
    const dataRows = rawData.slice(3);

    // 1. Generar solo los DATOS del Excel y añadirlos a allPriceCards
    dataRows.forEach(row => {
        for (let colIndex = 0; colIndex < row.length; colIndex += 2) {
            const product = row[colIndex];
            const price = row[colIndex + 1];

            if (!product || typeof product !== 'string' || product.trim() === '') continue;

            let formattedPrice = 'N/A';
            let validPrice = false;

            if (price !== undefined && price !== null && price !== "") {
                // CLAVE: Usamos .replace(/[$,]/g, '').trim() para limpiar precios de formato excel
                const numPrice = parseFloat(String(price).replace(/[$,]/g, '').trim());
                if (!isNaN(numPrice)) {
                    formattedPrice = numPrice.toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    validPrice = true;
                }
            }

            if (validPrice) {
                // Usamos el contador nextExcelId que se reinicia al cargar un nuevo Excel
                const ticketId = `excel-card-${nextExcelId++}`;

                allPriceCards.push({
                    id: ticketId,
                    product: product,
                    formattedPrice: formattedPrice,
                    isManual: false
                });
                validCount++;
            }
        }
    });

    // 2. Distribuir y Renderizar el HTML
    if (allPriceCards.length > 0) {
        renderFilteredLabels(""); // Renderiza sin filtro (muestra todo)
        placeholderContainer.classList.add('hidden');
        priceList.classList.remove('hidden');
        searchBox.disabled = false;

        updatePrintButtonState(); // Sincroniza el estado de los botones

        const excelCount = allPriceCards.filter(c => !c.isManual).length;
        const manualCount = allPriceCards.filter(c => c.isManual).length;

        let summaryMessage = '';
        if (excelCount > 0) summaryMessage += `Se cargaron ${excelCount} precios del Excel.`;
        if (manualCount > 0) summaryMessage += `${excelCount > 0 ? ' y' : ''} ${manualCount} tickets manuales están presentes.`;

        displayMessage(`Éxito: ${summaryMessage} Total de tickets: ${allPriceCards.length}.`, 'info');
    } else {
        // Si no hay nada (ni manuales ni de Excel)
        placeholderContainer.classList.remove('hidden');
        priceList.classList.add('hidden');
        searchBox.disabled = true;
        displayMessage("El archivo no contiene datos de producto/precio válidos en el formato esperado.", 'error');
        updatePrintButtonState();
    }

    // 3. Activar la advertencia de recarga si hay precios
    checkAndSetUnloadWarning();
}

// Listener para el input de archivo
excelFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    message.classList.add('hidden');
    const reader = new FileReader();
    reader.onload = async (e) => await processExcelData(e.target.result);
    reader.onerror = () => displayMessage('Error al leer el archivo. Asegúrate de que no esté corrupto.', 'error');
    reader.readAsArrayBuffer(file);
});

// ====================================================================
// NUEVA LÓGICA DE ADVERTENCIA AL RECARGAR O SALIR
// ====================================================================

/**
 * Verifica si hay datos cargados y activa/desactiva la advertencia de recarga.
 */
function checkAndSetUnloadWarning() {
    // Comprueba si hay tickets cargados (manuales o de Excel)
    const hasData = allPriceCards.length > 0;

    if (hasData) {
        // Si hay datos, activa la función de advertencia al intentar cerrar o recargar
        window.onbeforeunload = function (e) {
            // El mensaje aquí es ignorado por la mayoría de los navegadores por razones de seguridad, 
            // pero la presencia de un valor de retorno activa la ventana de confirmación.
            const confirmationMessage = "¡Compañero! Estás seguro de actualizar/cerrar la página? Se perderán todos los precios cargados del Excel y los tickets manuales. Por favor, cancela y usa F6 para la Tasa del Dólar si no quieres perder esta información.";
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage; // Para navegadores antiguos
        };
    } else {
        // Si no hay datos, desactiva la función
        window.onbeforeunload = null;
    }
}

// ====================================================================

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updatePrintButtonState(); // Llama para inicializar el estado de los botones correctamente
    priceList.classList.add('hidden');
    initFeriaSelection(); // Inicia el proceso de selección de feria
    checkAndSetUnloadWarning(); // Inicializa la advertencia (desactivada si no hay datos)
});

// NUEVA FUNCIÓN: Listener para la tecla F6
document.addEventListener('keydown', function (event) {
    // keyCode 116 corresponde a F6. También usamos event.key para modernidad.
    if (event.key === 'F6' || event.keyCode === 116) {
        // Al presionar F6, el navegador intentará recargar O navegar.
        // Si hay datos cargados, el onbeforeunload se encargará de preguntar.

        // Si no hay datos, o si el usuario confirma la recarga, esto lo lleva a dollar.html
        // Sin embargo, para que onbeforeunload funcione correctamente, NO debemos llamar a window.location.href aquí,
        // sino dejar que el comportamiento por defecto de F6 o la confirmación del usuario actúe.

        // Puesto que el objetivo es ir a dollar.html al presionar F6, pero el navegador lo recarga, 
        // vamos a forzar la navegación ÚNICAMENTE si NO hay datos, o si se maneja con una confirmación.

        if (allPriceCards.length === 0) {
            // Si no hay nada cargado, navega directamente sin preguntar.
            event.preventDefault(); // Detenemos la recarga por defecto
            window.location.href = 'dollar.html';
        } else {
            // Si hay datos, dejamos que onbeforeunload se encargue de la advertencia. 
            // Si el usuario cancela, se queda aquí. Si acepta, recarga y va a dollar.html.
            // Esto es lo mejor que se puede hacer con las restricciones de seguridad modernas de los navegadores.
            // Alerta al usuario sobre la acción.
            displayMessage("Presionaste F6. Si recargas la página, se perderán los datos. ¡Para ir a la Tasa del Dólar sin perderlos, cancela y luego hazlo!", 'error');
        }
    }
});

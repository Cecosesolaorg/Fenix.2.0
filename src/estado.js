/**
 * Global State
 */

let allCards = [];
let selectedIds = new Set();
let currentFeria = null;
let nextManualId = 10000;
let nextExcelId = 1;
let tasaBCV = localStorage.getItem('tasaBCV') || 0;
let bcvHistory = JSON.parse(localStorage.getItem('bcvHistory') || '[]');

// DOM Elements
const priceGrid = document.getElementById('price-grid');
const searchBox = document.getElementById('search-box');
const statusMsg = document.getElementById('status-message');
const emptyState = document.getElementById('empty-state');
const printBtn = document.getElementById('print-btn');
const excelInput = document.getElementById('excel-file');
const dropZone = document.getElementById('drop-zone');
const mainTitle = document.getElementById('main-title');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const themeToggle = document.getElementById('theme-toggle');
const dateEl = document.getElementById('current-date');
const manualModal = document.getElementById('manual-modal');
const presetsModal = document.getElementById('presets-modal');
const presetsGrid = document.getElementById('presets-grid');
const manualNameInput = document.getElementById('manual-name');
const manualPriceInput = document.getElementById('manual-price');

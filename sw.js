const CACHE_NAME = 'fenix-ticker-v1';
const ASSETS = [
    './',
    './index.html',
    './centro.html',
    './este.html',
    './ruiz.html',
    './charcuteria.html',
    './precios.html',
    './style.css',
    './styles.css',
    './src/datos_productos.js',
    './src/estado.js',
    './src/utilidades.js',
    './src/interfaz.js',
    './src/subir_excel.js',
    './src/precio_dolar.js',
    './src/gestion_tickets.js',
    './src/principal.js',
    './logo_cecosesola.png',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

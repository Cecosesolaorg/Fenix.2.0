/**
 * Constants and Configurations
 */

const FERIAS = {
    'centro': { name: 'Feria del Centro', handle: '@redcecosesola | FERIA DEL CENTRO' },
    'este': { name: 'Feria del Este', handle: '@redcecosesola | FERIA DEL ESTE' },
    'ruiz': { name: 'Feria de Ruiz Pineda', handle: '@redcecosesola | FERIA DE RUIZ PINEDA' },
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

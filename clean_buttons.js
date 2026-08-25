const fs = require('fs');
const files = ['ruiz.html', 'centro.html', 'este.html', 'precios.html', 'precios_premium.html', 'charcuteria.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Remove the hardcoded buttons
    // The regex removes any button with id 'presets-btn', 'mascota-btn', 'charcuteria-btn'
    content = content.replace(/<button[^>]*id="presets-btn"[\s\S]*?<\/button>/g, '');
    content = content.replace(/<button[^>]*id="mascota-btn"[\s\S]*?<\/button>/g, '');
    content = content.replace(/<button[^>]*id="charcuteria-btn"[\s\S]*?<\/button>/g, '');

    fs.writeFileSync(f, content);
});
console.log('Removed hardcoded preset buttons');

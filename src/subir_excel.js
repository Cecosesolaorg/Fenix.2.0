/**
 * Excel Processing Logic
 */

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
        const fechaHoy = `${diaNum} -${mesNum} `;

        const diasSemana = ['LUNES', 'MARTES', 'MIERCOLES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'SÁBADO', 'DOMINGO'];
        const diaSemanaHoy = diasSemana[now.getDay() === 0 ? 8 : now.getDay() - 1];

        let sheetName = workbook.SheetNames[0];
        let foundMatch = false;

        for (const name of workbook.SheetNames) {
            const cleanName = name.replace(/[\/\.]/g, '-');
            if (cleanName.includes(fechaHoy)) {
                sheetName = name;
                foundMatch = true;
                break;
            }
        }

        if (!foundMatch) {
            for (const name of workbook.SheetNames) {
                if (name.toUpperCase().includes(diaSemanaHoy)) {
                    sheetName = name;
                    foundMatch = true;
                    break;
                }
            }
        }

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

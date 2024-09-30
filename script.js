let chemicals = [
    { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 6495.18 },
    { id: 2, name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 8751.90 },
    { id: 3, name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 5964.61 },
    { id: 4, name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 8183.73 },
    { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 4154.33 },
    { id: 6, name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34 },
    { id: 7, name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250.00, unit: "kg", quantity: 8749.54 },
    { id: 8, name: "Sodium Hydroxide", vendor: "BASF", density: 2130.00, viscosity: 55.30, packaging: "Drum", packSize: 200.00, unit: "kg", quantity: 7500.00 },
    { id: 9, name: "Hydrochloric Acid", vendor: "Evonik", density: 1190.00, viscosity: 1.90, packaging: "IBC", packSize: 1000.00, unit: "L", quantity: 5000.00 },
    { id: 10, name: "Ethanol", vendor: "Cargill", density: 789.00, viscosity: 1.20, packaging: "Tank", packSize: 10000.00, unit: "L", quantity: 15000.00 },
    { id: 11, name: "Sulfuric Acid", vendor: "Chemours", density: 1840.00, viscosity: 26.70, packaging: "Tanker", packSize: 20000.00, unit: "kg", quantity: 30000.00 },
    { id: 12, name: "Acetone", vendor: "Ineos", density: 784.00, viscosity: 0.32, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 4000.00 },
    { id: 13, name: "Methanol", vendor: "Methanex", density: 792.00, viscosity: 0.59, packaging: "IBC", packSize: 1000.00, unit: "L", quantity: 10000.00 },
    { id: 14, name: "Toluene", vendor: "ExxonMobil", density: 867.00, viscosity: 0.59, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 3000.00 },
    { id: 15, name: "Isopropyl Alcohol", vendor: "Shell", density: 786.00, viscosity: 2.10, packaging: "IBC", packSize: 1000.00, unit: "L", quantity: 8000.00 },
];

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    chemicals.forEach((chemical, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td><input type="checkbox" onchange="toggleRowSelection(this)"></td>
            <td>${index + 1}</td>
            <td class="chemical-name-column"><input type="text" value="${chemical.name}" onchange="updateChemical(${index}, 'name', this.value)"></td>
            <td><input type="text" value="${chemical.vendor}" onchange="updateChemical(${index}, 'vendor', this.value)"></td>
            <td class="boxed-cell"><input type="number" value="${chemical.density}" onchange="updateChemical(${index}, 'density', this.value)"></td>
            <td class="boxed-cell"><input type="number" value="${chemical.viscosity}" onchange="updateChemical(${index}, 'viscosity', this.value)"></td>
            <td><input type="text" value="${chemical.packaging}" onchange="updateChemical(${index}, 'packaging', this.value)"></td>
            <td><input type="number" value="${chemical.packSize}" onchange="updateChemical(${index}, 'packSize', this.value)"></td>
            <td><input type="text" value="${chemical.unit}" onchange="updateChemical(${index}, 'unit', this.value)"></td>
            <td class="boxed-cell"><input type="number" value="${chemical.quantity}" onchange="updateChemical(${index}, 'quantity', this.value)"></td>
        `;
    });
}

function toggleRowSelection(checkbox) {
    checkbox.closest('tr').classList.toggle('selected', checkbox.checked);
}

function toggleSelectAll(selectAllCheckbox) {
    const checkboxes = document.querySelectorAll('#tableBody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        toggleRowSelection(checkbox);
    });
}

function updateChemical(index, field, value) {
    chemicals[index][field] = value;
}

function sortTable(column) {
    chemicals.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
    });
    renderTable();
}

function addRow() {
    const newId = Math.max(...chemicals.map(c => c.id)) + 1;
    chemicals.push({ id: newId, name: "", vendor: "", density: 0, viscosity: 0, packaging: "", packSize: 0, unit: "", quantity: 0 });
    renderTable();
}

function deleteRow() {
    chemicals = chemicals.filter((_, index) => !document.querySelector(`#tableBody tr:nth-child(${index + 1}) input[type="checkbox"]`).checked);
    renderTable();
}

function moveRowUp() {
    const checkedIndex = chemicals.findIndex((_, index) => document.querySelector(`#tableBody tr:nth-child(${index + 1}) input[type="checkbox"]`).checked);
    if (checkedIndex > 0) {
        [chemicals[checkedIndex - 1], chemicals[checkedIndex]] = [chemicals[checkedIndex], chemicals[checkedIndex - 1]];
        renderTable();
    }
}

function moveRowDown() {
    const checkedIndex = chemicals.findIndex((_, index) => document.querySelector(`#tableBody tr:nth-child(${index + 1}) input[type="checkbox"]`).checked);
    if (checkedIndex < chemicals.length - 1 && checkedIndex !== -1) {
        [chemicals[checkedIndex], chemicals[checkedIndex + 1]] = [chemicals[checkedIndex + 1], chemicals[checkedIndex]];
        renderTable();
    }
}

function refreshData() {
    renderTable();
}

function saveData() {
    console.log("Data saved:", chemicals);
    alert("Data saved successfully!");
}

renderTable();

document.querySelectorAll('th').forEach((header, index) => {
    if (index > 1) {
        header.addEventListener('click', () => sortTable(Object.keys(chemicals[0])[index - 1]));
    }
});

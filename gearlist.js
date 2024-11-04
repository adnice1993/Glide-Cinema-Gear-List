document.addEventListener("DOMContentLoaded", () => {
    const addGearButton = document.getElementById("add-gear");
    const printButton = document.getElementById("print-list");

    if (addGearButton) addGearButton.addEventListener("click", addGearRow);
    if (printButton) printButton.addEventListener("click", printPDF);

    // Initial test row
    addGearRow();
});

function createDropdown(options, className) {
    const dropdown = document.createElement("select");
    dropdown.className = className;
    dropdown.innerHTML = `<option value="">Select ${className}</option>`;
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
    return dropdown;
}

function addGearRow() {
    const gearTable = document.getElementById("gear-table");
    if (!gearTable) {
        console.error("gear-table element not found");
        return;
    }

    const newRow = document.createElement("div");
    newRow.className = "gear-row";

    // Add dropdowns with placeholder options for each category
    newRow.appendChild(createDropdown(['Sample Owner'], 'Owner'));
    newRow.appendChild(createDropdown(['Sample Category'], 'Category'));
    newRow.appendChild(createDropdown(['Sample Camera'], 'Camera'));
    newRow.appendChild(createDropdown(['Sample Drone'], 'Drone'));
    newRow.appendChild(createDropdown(['Sample Lighting'], 'Lighting'));

    // Add Check Out and Check In checkboxes
    const checkOutBox = document.createElement("input");
    checkOutBox.type = "checkbox";
    checkOutBox.className = "CheckOut";
    newRow.appendChild(checkOutBox);

    const checkInBox = document.createElement("input");
    checkInBox.type = "checkbox";
    checkInBox.className = "CheckIn";
    newRow.appendChild(checkInBox);

    gearTable.appendChild(newRow);
}

function printPDF() {
    window.print();
}

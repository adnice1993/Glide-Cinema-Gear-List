// List of options for each column dropdown
const optionsData = {
    Owner: ["Glide Cinema", "Kodiak Films", "Chronicle Cinema", "Filmhaus", "Alpha Line Media"],
    Category: ["Category A", "Category B", "Category C"],
    Camera: ["Camera A", "Camera B", "Camera C"],
    Drone: ["Drone A", "Drone B", "Drone C"],
    Lighting: ["Lighting A", "Lighting B", "Lighting C"],
    "Diff/Attach": ["Diffuser A", "Attachment B", "Attachment C"],
    Lenses: ["Lens A", "Lens B", "Lens C"],
    Audio: ["Audio A", "Audio B", "Audio C"],
    "Camera Support": ["Support A", "Support B", "Support C"],
    Monitoring: ["Monitor A", "Monitor B", "Monitor C"],
    Stands: ["Stand A", "Stand B", "Stand C"],
    GE: ["GE A", "GE B", "GE C"],
    Grip: ["Grip A", "Grip B", "Grip C"],
    Battery: ["Battery A", "Battery B", "Battery C"],
    Media: ["Media A", "Media B", "Media C"],
    Extra: ["Extra A", "Extra B", "Extra C"],
};

// Function to create a dropdown for each column
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

// Function to add a row to the table
function addGearRow() {
    const gearTable = document.getElementById("gear-table");
    const newRow = document.createElement("div");
    newRow.className = "gear-row";

    // Create dropdowns for each column
    for (const column in optionsData) {
        const dropdown = createDropdown(optionsData[column], column);
        newRow.appendChild(dropdown);
    }

    gearTable.appendChild(newRow);
}

// Function to print the table
function printPDF() {
    window.print();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    const addGearButton = document.getElementById("add-gear");
    const printButton = document.getElementById("print-list");

    if (addGearButton) addGearButton.addEventListener("click", addGearRow);
    if (printButton) printButton.addEventListener("click", printPDF);

    // Add initial row on load
    addGearRow();
});

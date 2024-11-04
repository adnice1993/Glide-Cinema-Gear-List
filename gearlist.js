alert("JavaScript file is loaded!");
const SHEET_ID = "1vGJXAyyjTgTdC00yIWB-BUcnmFLVWwnDJxCuIs0zvuI";  // Your Google Sheet ID
const API_KEY = "AIzaSyBdFf4wtcwb9hBzMk94oRa5iY7Keydns94";         // Your Google Sheets API Key
const SHEET_NAME = "Glide Cinema Gear List";                        // Your sheet tab name

let gearData = {};

async function fetchData() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Fetched Data:", data);
        processData(data.values);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

function processData(rows) {
    console.log("Processing Data...");
    const headers = rows[0];
    headers.forEach(header => gearData[header] = []);
    rows.slice(1).forEach(row => {
        row.forEach((item, index) => {
            const header = headers[index];
            if (!gearData[header].includes(item)) {
                gearData[header].push(item);
            }
        });
    });
    console.log("Processed Gear Data:", gearData);
    addGearRow();
}

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
    const newRow = document.createElement("div");
    newRow.className = "gear-row";

    // Add dropdowns for each category
    newRow.appendChild(createDropdown(gearData['Owner'], 'Owner'));
    newRow.appendChild(createDropdown(gearData['Category'], 'Category'));
    newRow.appendChild(createDropdown(gearData['Camera'], 'Camera'));
    newRow.appendChild(createDropdown(gearData['Drone'], 'Drone'));
    newRow.appendChild(createDropdown(gearData['Lighting'], 'Lighting'));
    newRow.appendChild(createDropdown(gearData['Diff/Attach'], 'Diff/Attach'));
    newRow.appendChild(createDropdown(gearData['Lenses'], 'Lenses'));
    newRow.appendChild(createDropdown(gearData['Audio'], 'Audio'));
    newRow.appendChild(createDropdown(gearData['Camera Support'], 'Camera Support'));
    newRow.appendChild(createDropdown(gearData['Monitoring'], 'Monitoring'));
    newRow.appendChild(createDropdown(gearData['Stands'], 'Stands'));
    newRow.appendChild(createDropdown(gearData['GE'], 'GE'));
    newRow.appendChild(createDropdown(gearData['Grip'], 'Grip'));
    newRow.appendChild(createDropdown(gearData['Battery'], 'Battery'));
    newRow.appendChild(createDropdown(gearData['Media'], 'Media'));
    newRow.appendChild(createDropdown(gearData['Extra'], 'Extra'));

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

// Event Listeners
document.getElementById("add-gear").addEventListener("click", addGearRow);
document.getElementById("print-list").addEventListener("click", printPDF);

fetchData();


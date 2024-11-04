const SHEET_ID = "1vGJXAyyjTgTdC00yIWB-BUcnmFLVWwnDJxCuIs0zvuI";
const API_KEY = "AIzaSyBdFf4wtcwb9hBzMk94oRa5iY7Keydns94";
const SHEET_NAME = "Glide Cinema Gear List";
let gearData = {};

async function fetchData() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        processData(data.values);
        document.getElementById('gear-list-container').innerText += "\nData fetched successfully!";
    } catch (error) {
        document.getElementById('gear-list-container').innerText = "Failed to fetch data: " + error.message;
        console.error("Error fetching data:", error);
    }
}

function processData(rows) {
    rows.slice(1).forEach(row => {
        const [category, owner, gear] = row;
        if (!gearData[owner]) gearData[owner] = {};
        if (!gearData[owner][category]) gearData[owner][category] = [];
        gearData[owner][category].push(gear);
    });
    populateOwnerOptions();
}

function populateOwnerOptions() {
    const ownerDropdown = document.querySelector(".owner-dropdown");
    ownerDropdown.innerHTML = '<option value="">Select Owner</option>';
    Object.keys(gearData).forEach(owner => {
        const option = document.createElement("option");
        option.value = owner;
        option.textContent = owner;
        ownerDropdown.appendChild(option);
    });
}

function populateCategoryOptions(ownerDropdown) {
    const selectedOwner = ownerDropdown.value;
    const categoryDropdown = ownerDropdown.nextElementSibling;
    categoryDropdown.innerHTML = '<option value="">Select Category</option>';
    const gearDropdown = categoryDropdown.nextElementSibling;
    gearDropdown.innerHTML = '<option value="">Select Gear</option>';

    if (selectedOwner && gearData[selectedOwner]) {
        Object.keys(gearData[selectedOwner]).forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });
    }
}

function populateGearOptions(categoryDropdown) {
    const selectedOwner = categoryDropdown.previousElementSibling.value;
    const selectedCategory = categoryDropdown.value;
    const gearDropdown = categoryDropdown.nextElementSibling;
    gearDropdown.innerHTML = '<option value="">Select Gear</option>';

    if (selectedOwner && selectedCategory && gearData[selectedOwner][selectedCategory]) {
        gearData[selectedOwner][selectedCategory].forEach(gear => {
            const option = document.createElement("option");
            option.value = gear;
            option.textContent = gear;
            gearDropdown.appendChild(option);
        });
    }
}

function addGearRow() {
    const gearTable = document.getElementById("gear-table");
    const newRow = document.createElement("div");
    newRow.className = "gear-row";
    newRow.innerHTML = `
        <select class="dropdown owner-dropdown" onchange="populateCategoryOptions(this)">
            <option value="">Select Owner</option>
            ${Object.keys(gearData).map(owner => `<option value="${owner}">${owner}</option>`).join("")}
        </select>
        <select class="dropdown category-dropdown" onchange="populateGearOptions(this)">
            <option value="">Select Category</option>
        </select>
        <select class="dropdown gear-dropdown">
            <option value="">Select Gear</option>
        </select>
    `;
    gearTable.appendChild(newRow);
}

fetchData();

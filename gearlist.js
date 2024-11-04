const SHEET_ID = "1vGJXAyyjTgTdC00yIWB-BUcnmFLVWwnDJxCuIs0zvuI";
const API_KEY = "AIzaSyBdFf4wtcwb9hBzMk94oRa5iY7Keydns94";
const SHEET_NAME = "Glide Cinema Gear List";
let gearData = {};  // Object to store gear data by category and owner

async function fetchData() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Fetched Data:", data);  // Log the fetched data to the console for debugging
        processData(data.values);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

function processData(rows) {
    console.log("Processing Data...");  // Debugging line to indicate data processing has started
    rows.slice(1).forEach(row => {
        const [category, owner, gear] = row;
        if (!gearData[owner]) gearData[owner] = {};  // Initialize owner category if it doesn't exist
        if (!gearData[owner][category]) gearData[owner][category] = [];  // Initialize category array
        gearData[owner][category].push(gear);  // Add gear to the appropriate category
    });
    console.log("Processed Gear Data:", gearData);  // Log processed gear data for debugging
    populateOwnerOptions();
}

function populateOwnerOptions() {
    const ownerDropdown = document.querySelector(".owner-dropdown");
    ownerDropdown.innerHTML = '<option value="">Select Owner</option>';  // Clear existing options
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
    categoryDropdown.innerHTML = '<option value="">Select Category</option>';  // Reset category dropdown
    const gearDropdown = categoryDropdown.nextElementSibling;
    gearDropdown.innerHTML = '<option value="">Select Gear</option>';  // Reset gear dropdown

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
    gearDropdown.innerHTML = '<option value="">Select Gear</option>';  // Reset gear dropdown

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

// Fetch data on page load
fetchData();

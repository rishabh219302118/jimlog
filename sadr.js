const notesContainer = document.querySelector(".notes-container");
const sadrTableBody = document.querySelector("#sadr tbody");

// Function to update localStorage with new entries
    function updateStorage() {
        const entries = [];
        // Loop through table rows and get data
        const rows = sadrTableBody.querySelectorAll("tr");
        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            if (cells.length === 4) { // Ensure it's not a header row
                const entry = {
                    weight: cells[0].textContent,
                    reps: cells[1].textContent,
                    rpe: cells[2].textContent,
                    detail: cells[3].textContent
                };
                entries.push(entry);
            }
        });
    // Update localStorage
    localStorage.setItem("sadrEntries", JSON.stringify(entries));
}

// Function to create a new table block
function createNewTable() {
    const newTable = document.createElement("table");
    newTable.innerHTML = `
        <tbody>
            <tr>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
            </tr>
        </tbody>
    `;
    return newTable;
}

// Automatically create a new table block when the page loads
const newTable = createNewTable();

// Function to add a new row at the top
function addRowOnTop() {
    const newRow = sadrTableBody.insertRow(0); // Insert at index 0 to add at the top
    newRow.innerHTML = `
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
    `;
    updateStorage(); // Update storage when a new row is added
}

// Button to add a new row at the top
const addRowBtn = document.createElement("button");
addRowBtn.textContent = "SET COMPLETED";
addRowBtn.addEventListener("click", () => {
    addRowOnTop();
});

// Insert the button at the beginning of the notesContainer
notesContainer.insertBefore(addRowBtn, notesContainer.firstChild);

// Function to create a new row with full colspan containing date and day
function createFullSpanRow() {
    const newRow = sadrTableBody.insertRow(0); // Insert at index 0 to add at the top
    newRow.innerHTML = `
        <td colspan="4" class="date-day-cell"></td>
    `;
    updateDateAndDay();
}

// Function to update the date and day in the full span row
function updateDateAndDay() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.querySelector(".date-day-cell").textContent = formattedDate;
}

// Automatically create the full span row with date and day when the page loads
createFullSpanRow();

// Load stored entries from localStorage when the page loads
function loadStoredEntries() {
    const storedEntries = localStorage.getItem("sadrEntries");
    if (storedEntries) {
        const entries = JSON.parse(storedEntries);
        entries.forEach(entry => {
            const newRow = sadrTableBody.insertRow();
            newRow.innerHTML = `
                <td contenteditable="true">${entry.weight}</td>
                <td contenteditable="true">${entry.reps}</td>
                <td contenteditable="true">${entry.rpe}</td>
                <td contenteditable="true">${entry.detail}</td>
                
            `;
        });
    }
}

// Load stored entries when the page loads
loadStoredEntries();

// Attach event listeners to each editable cell to update storage on input
const editableCells = document.querySelectorAll("td[contenteditable='true']");
editableCells.forEach(cell => {
    cell.addEventListener("input", updateStorage);
});

// Attach event listeners to each delete row button
const deleteRowBtns = document.querySelectorAll(".delete-row-btn");
deleteRowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const row = btn.closest("tr");
        row.remove();
        updateStorage();
    });
});

// Update the date and day when the page is loaded
updateDateAndDay();

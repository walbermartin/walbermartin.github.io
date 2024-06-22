// JSON object with form data
const formData = {
    names: [
        { name: "Willow Alber-Martin", checked: true },
        { name: "Chili Alber-Martin", checked: false },
        { name: "Ismael Alber-Martin", checked: true },
        { name: "Phlubbs Alber-Martin", checked: false }
    ],
    textInput: "",
    transportation: {
        yes: false,
        no: false
    }
};6

// Function to generate checkboxes dynamically
function generateCheckboxes(data) {
    const container = document.getElementById('checkboxesContainer');
    data.names.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'checkbox-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox' + (index + 1);
        checkbox.name = 'option' + (index + 1);
        checkbox.value = 'option' + (index + 1);
        checkbox.checked = item.checked;  // Set the checked attribute based on JSON data

        const label = document.createElement('label');
        label.htmlFor = 'checkbox' + (index + 1);
        label.textContent = item.name;

        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

// Function to initialize the form based on JSON data
function initializeForm(data) {
    // Generate checkboxes
    generateCheckboxes(data);

    // Set textarea value
    document.getElementById("textInput").value = data.textInput;

    // Set transportation checkboxes
    const transportationYes = document.getElementById("transportationYes");
    const transportationNo = document.getElementById("transportationNo");

    transportationYes.checked = data.transportation.yes;
    transportationNo.checked = data.transportation.no;

    transportationYes.addEventListener('change', function() {
        if (transportationYes.checked) {
            transportationNo.checked = false;
        }
    });

    transportationNo.addEventListener('change', function() {
        if (transportationNo.checked) {
            transportationYes.checked = false;
        }
    });
}

// Call the function to initialize the form when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeForm(formData);
});
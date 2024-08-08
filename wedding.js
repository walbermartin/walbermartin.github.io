let data = {};
let id = 0;

// Function to generate checkboxes dynamically
function generateCheckboxes(data) {
    const container = document.getElementById('checkboxesContainer');
    let index = 0;
    console.log(data.Item.names.M)
    for (const key in data.Item.names.M) {
        const div = document.createElement('div');
        div.className = 'checkbox-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox' + (index + 1);
        checkbox.name = 'option' + (index + 1);
        checkbox.value = 'option' + (index + 1);
        checkbox.checked = data.Item.names.M[key].BOOL;  // Set the checked attribute based on JSON data

        const label = document.createElement('label');
        label.htmlFor = 'checkbox' + (index + 1);
        label.textContent = key;

        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
        index ++;
    }
}

// Function to initialize the form based on JSON data
function initializeForm(data) {
    // Generate checkboxes
    generateCheckboxes(data);

    // Set textarea value
    document.getElementById("textInput").value = data.Item.DietaryRestrictions.S;

    // Set transportation checkboxes
    // const transportationYes = document.getElementById("transportationYes");
    // const transportationNo = document.getElementById("transportationNo");

    // transportationYes.checked = data.Item.Transportation.BOOL;
    // transportationNo.checked = !data.Item.Transportation.BOOL;

    // transportationYes.addEventListener('change', function() {
    //     if (transportationYes.checked) {
    //         transportationNo.checked = false;
    //     }
    // });

    // transportationNo.addEventListener('change', function() {
    //     if (transportationNo.checked) {
    //         transportationYes.checked = false;
    //     }
    // });
}

// Call the function to initialize the form when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    
    const urlParams = new URLSearchParams(window.location.search);

    // Normalize parameters to lowercase
    const normalizedParams = new Map();

    for (const [key, value] of urlParams.entries()) {
        normalizedParams.set(key.toLowerCase(), value);
    }

    console.log(normalizedParams)
    id = normalizedParams.get('id');
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ef1a2d4k68.execute-api.us-east-1.amazonaws.com/Testing/rsvp/?userID=" + id);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = xhr.response;
            initializeForm(data);
            console.log(data);
        } else {
            console.log(`Error: ${xhr.status}`);
        }
        };
});

let timeoutId; // Variable to hold the timeout ID for debounce

// Function to perform the desired action (e.g., making API calls, updating UI) on text input change
function handleInputChange() {

    console.log(id); // Output: John 30
    console.log("Input changed");
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://ef1a2d4k68.execute-api.us-east-1.amazonaws.com/Testing/rsvp/");
    xhr.setRequestHeader("Content-Type", 'application/json');
    const body = {
        "UserID": id,
        "DietaryRestrictions": document.getElementById('textInput').value,
        "names": {},
        "Transportation": false
    };

    let index = 0;
    for (const key in data.Item.names.M) {
        body.names[key] = document.getElementById('checkbox' + (index + 1)).checked;
        index++;
    }

    console.log(body)
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
    xhr.send(JSON.stringify(body));
}

// Debounce function to limit function execution to once every 3 seconds
function debounce(callback, delay) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        callback.apply(this, arguments);
    }, delay);
}

// Get the text input element and add event listener
const textInputElement = document.getElementById('textInput'); // Replace with your input element ID
textInputElement.addEventListener('input', () => {
    debounce(handleInputChange, 1000);
});

// Get all checkbox elements and add event listeners
const checkboxContainer = document.getElementById('checkboxesContainer'); // Replace with the container ID where checkboxes are added
checkboxContainer.addEventListener('change', function(event) {
    if (event.target.matches('input[type="checkbox"]')) {
        handleInputChange(); // Call immediately for checkboxes
    }
});

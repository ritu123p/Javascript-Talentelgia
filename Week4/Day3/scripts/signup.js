document.addEventListener("DOMContentLoaded", function () {
    // Select all input fields
    const formInputs = document.querySelectorAll(".form-control");

    // Add on-blur validation to each field
    formInputs.forEach((input) => {
        input.addEventListener("blur", function () {
            validateField(input);
        });
    });

     // ✅ Check password match in real-time
     const passwordField = document.getElementById("password");
     const confirmPasswordField = document.getElementById("confirm-password");
 
     passwordField.addEventListener("input", function () {
         validateField(confirmPasswordField);
     });
 
     confirmPasswordField.addEventListener("input", function () {
         validateField(confirmPasswordField);
     });

    // Function to validate individual fields
    function validateField(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;
        let errorMessage = "";

        if (value === "") {
            errorMessage = "This field is required.";
            isValid = false;
        } else {
            if (id === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                errorMessage = "Enter a valid email.";
                isValid = false;
            }
            if (id === "phone" && !/^[6-9]\d{9}$/.test(value)) {
                errorMessage = "Enter a 10-digit phone number.";
                isValid = false;
            }
            if (id === "password" && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                errorMessage = "Password must be at least 8 characters including an uppercase, lowercase, a number, and a special character.";
                isValid = false;
            }
            if (id === "confirm-password") {
                const password = document.getElementById("password").value.trim();
                if (value !== password) {
                    errorMessage = "Passwords do not match.";
                    isValid = false;
                }
            }
        }

        showValidationMessage(input, isValid, errorMessage);
    }

    // Function to show validation messages
    function showValidationMessage(input, isValid, message) {
        let errorSpan = input.nextElementSibling;

        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "14px";
            input.parentNode.appendChild(errorSpan);
        }

        if (isValid) {
            input.style.border = "2px solid green";
            errorSpan.innerText = "";
        } else {
            input.style.border = "2px solid red";
            errorSpan.innerText = message;
        }
    }

    // Submit button event
    document.querySelector(".btn-warning").addEventListener("click", function (event) {
        event.preventDefault();

        let isFormValid = true;

        formInputs.forEach((input) => {
            validateField(input);
            if (input.style.border.includes("red")) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            alert("Please fix the errors before submitting.");
            return;
        }

        // Get first name & last name and combine them
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const fullName = `${firstName} ${lastName}`;

        const address1 = document.getElementById("address1").value.trim();
        const address2 = document.getElementById("address2").value.trim();
        const address = `${address1}, ${address2}`;

        // Collect form data
        const formData = {
            fullName: fullName,  // Storing full name as a single string
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: address,  // Storing address as a single string
            role: document.querySelector('input[name="inlineRadioOptions"]:checked')?.value,
            website: document.getElementById("website").value.trim(),
            company: document.getElementById("company").value.trim(),
            password: document.getElementById("password").value.trim(),
        };

        // Save data to JSON server
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Signup successful!");
            window.location.href="./login.html";
            console.log("Saved User:", data);
        })
        .catch((error) => console.error("Error:", error));
    });
});

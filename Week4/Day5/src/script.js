var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    if (loginForm && registerForm) {
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
    }
}

function showError(input, message) {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) {
        errorSpan.innerText = message;
        errorSpan.classList.remove('hidden');
    }
}

function clearError(input) {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) {
        errorSpan.innerText = '';
        errorSpan.classList.add('hidden');
    }
}

function validateName(input) {
    const nameRegex = /^[A-Za-z ]{3,}$/;
    if (nameRegex.test(input.value.trim())) {
        clearError(input);
        return true;
    } else {
        showError(input, "Name must be at least 3 characters long.");
        return false;
    }
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value.trim())) {
        clearError(input);
        return true;
    } else {
        showError(input, "Please enter a valid email address.");
        return false;
    }
}

function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(input.value.trim())) {
        clearError(input);
        return true;
    } else {
        showError(input, "Password must be at least 8 characters long, include an uppercase, a lowercase, a number, and a special character.");
        return false;
    }
}

// Attach event listeners to input fields for both onBlur and input events
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.id.includes("name") && validateName(input)) clearError(input);
            if (input.id.includes("email") && validateEmail(input)) clearError(input);
            if (input.id.includes("password") && validatePassword(input)) clearError(input);
            document.getElementById('login-error')?.classList.add('hidden');
        });

        input.addEventListener("blur", () => {
            if (input.id.includes("name")) validateName(input);
            if (input.id.includes("email")) validateEmail(input);
            if (input.id.includes("password")) validatePassword(input);
        });
    });
});



//Register
async function registerUser(event) {
    event.preventDefault();

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    if (!nameInput || !emailInput || !passwordInput) return;

    if (!validateName(nameInput) || !validateEmail(emailInput) || !validatePassword(passwordInput)) return;

    const user = { 
        name: nameInput.value.trim(), 
        email: emailInput.value.trim(), 
        password: passwordInput.value.trim() 
    };

    try {
        const response = await fetch('http://localhost:3002/users');
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const users = await response.json();
        if (users.some(u => u.email === user.email)) {
            showError(emailInput, "User already exists! Please login.");
            return;
        }

        const saveUserResponse = await fetch('http://localhost:3002/users', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (saveUserResponse.ok) {
            alert("Registration Successful!");
            location.reload();
        } else {
            alert("Failed to register user. Check JSON Server.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function loginUser(event) {
    event.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const loginErrorDiv = document.getElementById('login-error');

    if (!emailInput || !passwordInput || !loginErrorDiv) return;

    // Validate email and password using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valid = true;

    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        valid = false;
    } else {
        clearError(emailInput);
    }

    if (!passwordRegex.test(passwordInput.value.trim())) {
        showError(passwordInput, "Password must be at least 8 characters long, include an uppercase, a lowercase, a number, and a special character.");
        valid = false;
    } else {
        clearError(passwordInput);
    }

    if (!valid) return;

    try {
        const response = await fetch('http://localhost:3002/users');
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const users = await response.json();
        const validUser = users.find(u => u.email === emailInput.value.trim() && u.password === passwordInput.value.trim());

        if (validUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            window.location.href = "../public/user.html";
        } else {
            showLoginError("Invalid email or password! Please try again.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        showLoginError("An error occurred. Please try again later.");
    }
}

// Function to show error messages
function showError(input, message) {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) {
        errorSpan.innerText = message;
        errorSpan.classList.remove('hidden');
    }
}

// Function to clear error messages
function clearError(input) {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) {
        errorSpan.innerText = '';
        errorSpan.classList.add('hidden');
    }
}

// Function to show login error message
function showLoginError(message) {
    const loginErrorDiv = document.getElementById('login-error');
    if (loginErrorDiv) {
        loginErrorDiv.textContent = message;
        loginErrorDiv.classList.remove('hidden');
    }
}

// Hide error message when user starts typing
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            clearError(input);
            document.getElementById('login-error').classList.add('hidden'); // Hide login error when user starts typing
        });
    });
});

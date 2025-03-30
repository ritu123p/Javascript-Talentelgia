const API_URL: string = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm") as HTMLFormElement;
    if (form) form.addEventListener("submit", submitForm);
});

// Validation Function
function validateFields(
    name: string,
    email: string,
    phone: string,
    website: string,
    password: string,
    confirmPassword: string
): string | null {
    const nameRegex = /^[A-Za-z\s]{3,40}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

    if (!nameRegex.test(name)) return "Name must contain at least 3 letters and only letters & spaces.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number.";
    if (!websiteRegex.test(website)) return "Please enter a valid website URL.";
    if (!passwordRegex.test(password)) return "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.";
    if (password !== confirmPassword) return "Passwords do not match.";
    
    return null; // No errors
}

// Display Message Function
function displayMessage(color: string, text: string): void {
    const message = document.getElementById("message") as HTMLElement;
    message.style.color = color;
    message.innerHTML = text;
}

// Check if User Exists
async function checkUserExists(email: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}?email=${email}`);
        const users = await response.json();
        return users.length > 0;
    } catch (error) {
        console.error("Error checking user:", error);
        return false;
    }
}

// Form Submission Function
async function submitForm(event: Event): Promise<void> {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const address = (document.getElementById("address") as HTMLInputElement).value.trim();
    const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
    const website = (document.getElementById("website") as HTMLInputElement).value.trim();
    const company = (document.getElementById("company") as HTMLInputElement).value.trim();
    const role = (document.getElementById("role") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    const validationMessage = validateFields(name, email, phone, website, password, confirmPassword);
    if (validationMessage) {
        displayMessage("red", validationMessage);
        return;
    }

    displayMessage("", "");

    try {
        if (await checkUserExists(email)) {
            displayMessage("red", "User already exists with this email!");
            return;
        }

        const newUser = {
            id: String(Date.now()),
            name,
            email,
            address,
            phone,
            company,
            website,
            role,
            password
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            alert("Sign-up successful!");
            window.location.replace("login.html");
        } else {
            throw new Error("Failed to sign up.");
        }
    } catch (error) {
        console.error("Error signing up:", error);
        displayMessage("red", "Something went wrong. Please try again.");
    }
}

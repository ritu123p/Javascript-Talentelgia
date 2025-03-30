// Toggle between Login & Registration forms
function toggleForms(): void {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm && registerForm) {
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
    }
}

// ✅ REGISTER USER
async function registerUser(event: Event): Promise<void> {
    event.preventDefault();

    const nameInput = document.getElementById('reg-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('reg-email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('reg-password') as HTMLInputElement | null;

    if (!nameInput || !emailInput || !passwordInput) return;

    const user = {
        name: nameInput.value,
        email: nameInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch('http://localhost:3001/users');
        const users: Array<{ email: string }> = await response.json();
        const userExists = users.some(u => u.email === user.email);

        if (userExists) {
            alert("User already exists! Please login.");
            return;
        }

        await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        const successMessage = document.getElementById('register-success');
        if (successMessage) successMessage.classList.remove('hidden');

        setTimeout(() => toggleForms(), 2000);
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

// ✅ LOGIN USER
async function loginUser(event: Event): Promise<void> {
    event.preventDefault();

    const emailInput = document.getElementById('login-email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('login-password') as HTMLInputElement | null;

    if (!emailInput || !passwordInput) return;

    try {
        const response = await fetch('http://localhost:3001/users');
        const users: Array<{ email: string; password: string }> = await response.json();
        const validUser = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);

        if (validUser) {
            alert("Login successful! Redirecting...");
            window.location.href = "dashboard.html";
        } else {
            const errorMessage = document.getElementById('login-error');
            if (errorMessage) errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Attach event listeners for form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector<HTMLFormElement>('#login-form form');
    const registerForm = document.querySelector<HTMLFormElement>('#register-form form');

    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (registerForm) registerForm.addEventListener('submit', registerUser);
});
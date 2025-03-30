// Toggle between Login & Registration forms
function toggleForms() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}

// ✅ REGISTER USER
async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const user = { name, email, password };

    // Check if user already exists
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert("User already exists! Please login.");
        return;
    }

    // Save user data to JSON Server
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    document.getElementById('register-success').classList.remove('hidden');
    setTimeout(() => toggleForms(), 2000);
}

// ✅ LOGIN USER
async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const validUser = users.find(u => u.email === email && u.password === password);

    if (validUser) {
        alert("Login successful! Redirecting...");
        window.location.href = "dashboard.html";  // Redirect to another page
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

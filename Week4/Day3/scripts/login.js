var _a;
var API_URL = "http://localhost:3000/users";
(_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", loginUser);

function loginUser(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;
    var message = document.getElementById("message");

    if (!message) return;

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            console.log("Fetched Users:", users);
            var user = users.find(user => user.email === email);
            console.log("Matching User:", user);

            if (!user) {
                message.style.color = "red";
                message.innerHTML = "User not found!";
                return;
            }

            if (user.password !== password) {
                message.style.color = "red";
                message.innerHTML = "Incorrect password!";
                return;
            }

            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(user));

            message.style.color = "green";
            message.innerHTML = "Login successful!";
            alert("Login Successful!");

            if (user.role === "User") {
                window.location.href = `customer.html?email=${encodeURIComponent(email)}`;
            } else if (user.role === "Admin" || user.role === "Super Admin") {
                window.location.href = `index.html?email=${encodeURIComponent(email)}`;
            }
        })
        .catch(error => {
            console.error("Error logging in:", error);
            message.style.color = "red";
            message.innerHTML = "Login failed!";
        });
}

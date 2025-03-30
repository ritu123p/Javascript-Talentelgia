var API_URL = "http://localhost:3000/users";

// Extract email from URL
function getUserEmailFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("email");
}

// Fetch user data by email
function fetchUserData() {
    var email = getUserEmailFromURL();
    console.log("Extracted Email:", email); // Debugging

    if (!email) {
        alert("No user email found. Redirecting to login.");
        window.location.href = "login.html";
        return;
    }

    fetch(`${API_URL}?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(users => {
            if (!users.length) {
                alert("User not found! Redirecting to login.");
                window.location.href = "login.html";
                return;
            }

            var user = users[0]; // Assuming email is unique

            // Populate form fields  
            document.getElementById("editUserId").value = user.id;
            document.getElementById("updateName").value = user.fullName || "";
            document.getElementById("updateEmail").value = user.email || "";
            document.getElementById("updateAddress").value = user.address || "";
            document.getElementById("updatePhone").value = user.phone || "";
            document.getElementById("updateWebsite").value = user.website || "";
            document.getElementById("updateCompany").value = user.company || "";

            // Update table row
            var tableBody = document.querySelector("#user-table tbody");
            tableBody.innerHTML = ""; // Clear existing data
            var row = document.createElement("tr");
            row.id = `row-${user.id}`;
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.address || "N/A"}</td>
                <td>${user.role || "N/A"}</td>
                <td>${user.phone}</td>
                <td><a href="${user.website}" target="_blank">${user.website}</a></td>
                <td>${user.company || "N/A"}</td>
            `;
            tableBody.appendChild(row);

            // Attach delete event
            document.getElementById("deleteBtn")?.addEventListener("click", () => deleteUser(user.id));

            // Show update modal when clicking update button
            document.getElementById("updateBtn")?.addEventListener("click", () => {
                $("#editUsersModal").modal("show");
            });
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            alert("Failed to load user data.");
        });
}

var loggedInUser = JSON.parse(localStorage.getItem("user"));
if (loggedInUser) {
    // console.log("User Data:", loggedInUser);
    welcome = document.getElementById("uName");
    firstLetter = document.getElementById("firstLetter");
    firstLetter.innerHTML = `${loggedInUser.fullName.charAt(0).toUpperCase()}`;
    welcome.innerHTML = `Hello, ${loggedInUser.fullName}`;
} else {
    console.log("No user logged in.");
}

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("user"); // Clear stored user data
    window.location.href = "login.html"; // Redirect to login page
});



// Delete user function
function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete user.");
            document.getElementById(`row-${id}`)?.remove();
            alert("User deleted successfully!");
            window.location.href = "login.html";
        })
        .catch(error => console.error("Error deleting user:", error));
}

document.getElementById("updateForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    var userId = document.getElementById("editUserId")?.value?.trim();
    console.log("User ID on Submit:", userId); // Debugging

    if (!userId) {  // Don't check for NaN since it's a string
        alert("Error: Invalid user ID.");
        return;
    }

    var updatedUser = {
        fullName: document.getElementById("updateName").value,
        email: document.getElementById("updateEmail").value,
        phone: document.getElementById("updatePhone").value,
        address: document.getElementById("updateAddress").value,
        website: document.getElementById("updateWebsite").value,
        company: document.getElementById("updateCompany").value,
    };

    fetch(`${API_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        return response.json();
    })
    .then(updatedUserData => {
        alert("User updated successfully!");
        $("#editUsersModal").modal("hide");
        updateTableRow(updatedUserData);
    })
    .catch(error => console.error("Error updating user:", error));
});

// Update table row dynamically
function updateTableRow(updatedUser) {
    var row = document.getElementById(`row-${updatedUser.id}`);
    if (row) {
        row.cells[1].textContent = updatedUser.fullName;
        row.cells[2].textContent = updatedUser.email;
        row.cells[3].textContent = updatedUser.address || "N/A";
        row.cells[5].textContent = updatedUser.phone;
        row.cells[6].innerHTML = `<a href="${updatedUser.website}" target="_blank">${updatedUser.website}</a>`;
        row.cells[7].textContent = updatedUser.company || "N/A";
    }
}

// Fetch user when the page loads
fetchUserData();

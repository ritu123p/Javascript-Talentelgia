document.addEventListener("DOMContentLoaded", function () {
    var url = "http://localhost:3000/users";

    function fetchUsers() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var tableBody = document.querySelector("#user-table tbody");
                // var welcomeMsg = document.querySelector("#welcome");
                // if (welcomeMsg) welcomeMsg.innerHTML = `Welcome, ${data[0].fullName}!`;
                if (tableBody) tableBody.innerHTML = "";

                data.forEach(user => {
                    var row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.fullName}</td>
                        <td>${user.email}</td>
                        <td>${user.address || "N/A"}</td>  <!-- Fixed address -->
                        <td>${user.role}</td>
                        <td>${user.phone}</td>
                        <td><a href="${user.website}" target="_blank">${user.website}</a></td>
                        <td>${user.company}</td>
                        <td>
                            <button onclick="editUser('${user.id}')">Edit</button>
                            <button onclick="deleteData('${user.id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    window.deleteData = function (id) {
        fetch(`${url}/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" } })
            .then(() => {
                console.log(`Deleted record with ID: ${id}`);
                fetchUsers();
            })
            .catch(error => console.error("Error deleting data:", error));
    };

    window.editUser = function (userId) {
        fetch(`${url}/${userId}`)
            .then(response => response.json())
            .then(user => {
                document.getElementById("editUserId").value = user.id;
                document.getElementById("editName").value = user.fullName;
                document.getElementById("editEmail").value = user.email;
                document.getElementById("editAddress").value = user.address || "";  // Fixed address
                document.getElementById("editRole").value = user.role;
                document.getElementById("editPhone").value = user.phone;
                document.getElementById("editWebsite").value = user.website;
                document.getElementById("editCompany").value = user.company;

                window.currentUser = user; // Store user data including password
                $("#editUsersModal").modal("show");
            })
            .catch(error => console.error("Error fetching user:", error));
    };

    window.closeEditModal = function () {
        $("#editUsersModal").modal("hide");
    };

    document.getElementById("editUserForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var userId = document.getElementById("editUserId").value;
        if (!userId) {
            alert("Error: Cannot update. User ID is missing.");
            return;
        }

        var updatedUser = {
            id: userId,
            fullName: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            address: document.getElementById("editAddress").value , // Fixed address
            role: document.getElementById("editRole").value,
            phone: document.getElementById("editPhone").value,
            website: document.getElementById("editWebsite").value,
            company: document.getElementById("editCompany").value,
            password: window.currentUser.password // Retain existing password
        };

        fetch(`${url}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(response => response.json())
            .then(() => {
                alert("User updated successfully!");
                closeEditModal();
                fetchUsers();
            })
            .catch(error => console.error("Error updating user:", error));
    });


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

    fetchUsers();
});

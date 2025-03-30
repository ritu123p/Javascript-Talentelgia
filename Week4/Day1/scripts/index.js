document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var url = "http://localhost:3000/users";
    function fetchUsers() {
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var tableBody = document.querySelector('#user-table tbody');
            if (tableBody)
                tableBody.innerHTML = "";
            data.forEach(function (user) {
                var row = document.createElement('tr');
                row.innerHTML = "\n                        <td>".concat(user.id, "</td>\n                        <td>").concat(user.name, "</td>\n                        <td>").concat(user.email, "</td>\n                        <td>").concat(user.address.city, "</td>\n                        <td>").concat(user.role, "</td>\n                        <td>").concat(user.phone, "</td>\n                        <td><a href=\"").concat(user.company.website, "\" target=\"_blank\">").concat(user.company.website, "</a></td>\n                        <td>").concat(user.company.name, "</td>\n                        <td>\n                            <button onclick=\"editUser('").concat(user.id, "')\">Edit</button>\n                            <button onclick=\"deleteData('").concat(user.id, "')\">Delete</button>\n                        </td>\n                    ");
                tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(row);
            });
        })
            .catch(function (error) { return console.error("Error fetching users:", error); });
    }
    window.deleteData = function (id) {
        fetch("".concat(url, "/").concat(id), { method: 'DELETE', headers: { "Content-Type": "application/json" } })
            .then(function () {
            console.log("Deleted record with ID: ".concat(id));
            fetchUsers();
        })
            .catch(function (error) { return console.error('Error deleting data:', error); });
    };
    window.editUser = function (userId) {
        fetch("".concat(url, "/").concat(userId))
            .then(function (response) { return response.json(); })
            .then(function (user) {
            document.getElementById("editUserId").value = user.id;
            document.getElementById("editName").value = user.name;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editAddress").value = user.address.city;
            document.getElementById("editRole").value = user.role;
            document.getElementById("editPhone").value = user.phone;
            document.getElementById("editWebsite").value = user.company.website;
            document.getElementById("editCompany").value = user.company.name;
        })
            .catch(function (error) { return console.error("Error fetching user:", error); });
    };
    (_a = document.getElementById("editUserForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
        e.preventDefault();
        var userId = document.getElementById("editUserId").value;
        if (!userId) {
            alert("Error: Cannot update. User ID is missing.");
            return;
        }
        var updatedUser = {
            id: userId,
            name: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            address: { city: document.getElementById("editAddress").value },
            role: document.getElementById("editRole").value,
            phone: document.getElementById("editPhone").value,
            company: {
                website: document.getElementById("editWebsite").value,
                name: document.getElementById("editCompany").value
            }
        };
        fetch("".concat(url, "/").concat(userId), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            alert("User updated successfully!");
            fetchUsers();
        })
            .catch(function (error) { return console.error("Error updating user:", error); });
    });
    var form = document.getElementById("employeeForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = document.getElementById("name").value.trim();
            var email = document.getElementById("email").value.trim();
            var address = document.getElementById("address").value.trim();
            var role = document.getElementById("role").value;
            var phone = document.getElementById("phone").value.trim();
            var website = document.getElementById("website").value.trim();
            var company = document.getElementById("company").value.trim();
            if (!name || !email || !address || !phone || !website || !company) {
                alert("All fields are required!");
                return;
            }
            var newUser = {
                id: String(Date.now()),
                name: name,
                email: email,
                address: { city: address },
                role: role,
                phone: phone,
                company: { website: website, name: company }
            };
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                alert("User added successfully!");
                form.reset();
                fetchUsers();
            })
                .catch(function (error) { return console.error("Error adding user:", error); });
        });
    }
    fetchUsers();
});

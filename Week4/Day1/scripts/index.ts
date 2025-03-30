document.addEventListener("DOMContentLoaded", function () {
    const url: string = "http://localhost:3000/users";

    interface User {
        id: string;
        name: string;
        email: string;
        address: { city: string };
        role: string;
        phone: string;
        company: { website: string; name: string };
    }

    function fetchUsers(): void {
        fetch(url)
            .then(response => response.json())
            .then((data: User[]) => {
                const tableBody = document.querySelector('#user-table tbody');
                if (tableBody) tableBody.innerHTML = "";

                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.address.city}</td>
                        <td>${user.role}</td>
                        <td>${user.phone}</td>
                        <td><a href="${user.company.website}" target="_blank">${user.company.website}</a></td>
                        <td>${user.company.name}</td>
                        <td>
                            <button onclick="editUser('${user.id}')">Edit</button>
                            <button onclick="deleteData('${user.id}')">Delete</button>
                        </td>
                    `;
                    tableBody?.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    (window as any).deleteData = function (id: string): void {
        fetch(`${url}/${id}`, { method: 'DELETE', headers: { "Content-Type": "application/json" } })
            .then(() => {
                console.log(`Deleted record with ID: ${id}`);
                fetchUsers();
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    (window as any).editUser = function (userId: string): void {
        fetch(`${url}/${userId}`)
            .then(response => response.json())
            .then((user: User) => {
                (document.getElementById("editUserId") as HTMLInputElement).value = user.id;
                (document.getElementById("editName") as HTMLInputElement).value = user.name;
                (document.getElementById("editEmail") as HTMLInputElement).value = user.email;
                (document.getElementById("editAddress") as HTMLInputElement).value = user.address.city;
                (document.getElementById("editRole") as HTMLInputElement).value = user.role;
                (document.getElementById("editPhone") as HTMLInputElement).value = user.phone;
                (document.getElementById("editWebsite") as HTMLInputElement).value = user.company.website;
                (document.getElementById("editCompany") as HTMLInputElement).value = user.company.name;
            })
            .catch(error => console.error("Error fetching user:", error));
    };

    document.getElementById("editUserForm")?.addEventListener("submit", function (e: Event) {
        e.preventDefault();
        const userId = (document.getElementById("editUserId") as HTMLInputElement).value;
        if (!userId) {
            alert("Error: Cannot update. User ID is missing.");
            return;
        }

        const updatedUser: User = {
            id: userId,
            name: (document.getElementById("editName") as HTMLInputElement).value,
            email: (document.getElementById("editEmail") as HTMLInputElement).value,
            address: { city: (document.getElementById("editAddress") as HTMLInputElement).value },
            role: (document.getElementById("editRole") as HTMLInputElement).value,
            phone: (document.getElementById("editPhone") as HTMLInputElement).value,
            company: {
                website: (document.getElementById("editWebsite") as HTMLInputElement).value,
                name: (document.getElementById("editCompany") as HTMLInputElement).value
            }
        };

        fetch(`${url}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => {
            alert("User updated successfully!");
            fetchUsers();
        })
        .catch(error => console.error("Error updating user:", error));
    });

    const form = document.getElementById("employeeForm") as HTMLFormElement;
    if (form) {
        form.addEventListener("submit", function (e: Event) {
            e.preventDefault();
            const name = (document.getElementById("name") as HTMLInputElement).value.trim();
            const email = (document.getElementById("email") as HTMLInputElement).value.trim();
            const address = (document.getElementById("address") as HTMLInputElement).value.trim();
            const role = (document.getElementById("role") as HTMLInputElement).value;
            const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
            const website = (document.getElementById("website") as HTMLInputElement).value.trim();
            const company = (document.getElementById("company") as HTMLInputElement).value.trim();

            if (!name || !email || !address || !phone || !website || !company) {
                alert("All fields are required!");
                return;
            }

            const newUser: User = {
                id: String(Date.now()),
                name,
                email,
                address: { city: address },
                role,
                phone,
                company: { website, name: company }
            };

            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
                alert("User added successfully!");
                form.reset();
                fetchUsers();
            })
            .catch(error => console.error("Error adding user:", error));
        });
    }

    fetchUsers();
});

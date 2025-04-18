document.addEventListener("DOMContentLoaded", function () {

const url = "http://localhost:3000/users";

    //delete data 
window.deleteData = function (id) {
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log(`Deleted record with ID: ${id}`);
        // location.reload();
    })
    .catch(error => console.error('Error deleting data:', error));
};


// Function to populate edit form
window.editUser = function(userId) {
    fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById("editUserId").value = user.id;
            document.getElementById("editName").value = user.name;
            
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editAddress").value = user.address.city;
            document.getElementById('editRole').value = user.role;
            document.getElementById("editPhone").value = user.phone;
            document.getElementById("editWebsite").value = user.company.website;
            document.getElementById("editCompany").value = user.company.name;
        })
        .catch(error => console.error("Error fetching user:", error));
};



document.getElementById("editUserForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = document.getElementById("editUserId").value;

    if (!userId) {
        console.error("Error: User ID is missing.");
        alert("Error: Cannot update. User ID is missing.");
        return;
    }

    const updatedUser = {
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

    // Send PUT request to update user data
    fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("User updated:", data);
        alert("User updated successfully!");
        closeEditModal();
        fetchUsers();
    })
    .catch(error => console.error("Error updating user:", error));
});



    const tableBody = document.querySelector('#user-table tbody');
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
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
                    <a href="#editUsersModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit"><button onclick="editUser(${user.id})">&#xE254;</button></i></a>
					<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" ><i class="material-icons" data-toggle="tooltip" title="Delete"><button onclick="deleteData(${user.id})">&#xE872;</button></i></a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })


        document.getElementById('employeeForm').addEventListener('submit', function(e) {
            e.preventDefault();
          
            // Clear previous error messages
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('addressError').textContent = '';
            document.getElementById('phoneError').textContent = '';
            document.getElementById('websiteError').textContent = '';
            document.getElementById('companyError').textContent = '';
          
            // Get input values and trim whitespace
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var address = document.getElementById('address').value.trim();
            var role = document.getElementById('role').value;
            var phone = document.getElementById('phone').value.trim();
            var website = document.getElementById('website').value.trim();
            var company = document.getElementById('company').value.trim();
          
            var isValid = true;
          
            // Validate Name: required
            if (name === '') {
              document.getElementById('nameError').textContent = 'Name is required.';
              isValid = false;
            }
          
            // Validate Email: required and proper format
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
              document.getElementById('emailError').textContent = 'Email is required.';
              isValid = false;
            } else if (!emailRegex.test(email)) {
              document.getElementById('emailError').textContent = 'Enter a valid email address.';
              isValid = false;
            }
          
            // Validate Address: required
            if (address === '') {
              document.getElementById('addressError').textContent = 'Address is required.';
              isValid = false;
            }
          
            // Validate Phone: required and should be 10 digits (modify regex as needed)
            var phoneRegex = /^[6-9]\d{9}$/;
            if (phone === '') {
              document.getElementById('phoneError').textContent = 'Phone number is required.';
              isValid = false;
            } else if (!phoneRegex.test(phone) || phone.length !== 10) {
              document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.';
              isValid = false;
            }
          
            // Validate Website: required and a simple URL check (you can enhance this as needed)
            var websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            if (website === '') {
              document.getElementById('websiteError').textContent = 'Website is required.';
              isValid = false;
            } else if (!websiteRegex.test(website)) {
              document.getElementById('websiteError').textContent = 'Enter a valid website URL.';
              isValid = false;
            }
          
            // Validate Company: required
            if (company === '') {
              document.getElementById('companyError').textContent = 'Company is required.';
              isValid = false;
            }
          
            
            if (isValid) {
              console.log('Form is valid. You can now submit the data.');
              
            }
          });
          

//save data
    const form = document.getElementById("employeeForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); 

            // Get form values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const address = document.getElementById("address").value.trim();
            const role = document.getElementById("role").value;
            const phone = document.getElementById("phone").value.trim();
            const website = document.getElementById("website").value.trim();
            const company = document.getElementById("company").value.trim();

            // Validate input fields (Basic)
            if (!name || !email || !address || !phone || !website || !company) {
                alert("All fields are required!");
                return;
            }

            // Create user object
            const newUser = {
                id: String(Date.now()),
                name,
                email,
                address: { city: address },
                role,
                phone,
                company: { website, name: company }
            };

            // Send POST request to JSON Server
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
                console.log("User added:", data);
                // alert("User added successfully!");

                // Reset form fields after successful submission
                form.reset();
            })
            .catch(error => console.error("Error adding user:", error));
        });
    } else {
        console.error("Form with ID 'employeeForm' not found in the document.");
    }

})




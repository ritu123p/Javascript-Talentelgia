const user = { name: "Alice", age: 25, city: "New York" };

function displayUserInfo() {
    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
        <strong>Keys:</strong> ${Object.keys(user).join(", ")} <br>
        <strong>Values:</strong> ${Object.values(user).join(", ")}
    `;
}

displayUserInfo();

document.getElementById("updateBtn").addEventListener("click", function () {
    const newInfo = { country: "USA", job: "Developer" };

    Object.assign(user, newInfo);

    displayUserInfo();
});

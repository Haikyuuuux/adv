const button = document.getElementById("btn");
const userDiv = document.getElementById("user");
const loader = document.getElementById("loader");
const errorText = document.getElementById("error");

button.addEventListener("click", getRandomUser);

async function getRandomUser() {
    try {
        loader.classList.remove("hidden");
        userDiv.classList.add("hidden");
        errorText.textContent = "";

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        const randomIndex = Math.floor(Math.random() * users.length);
        const user = users[randomIndex];

        userDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;

        loader.classList.add("hidden");
        userDiv.classList.remove("hidden");

    } catch (error) {
        loader.classList.add("hidden");
        errorText.textContent = error.message;
        console.error(error);
    }
}
"use strict";
const API_KEY = "U44EKZ2W43BAZ8QW7NC34C74N"; 
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// Select Elements
const searchInput = document.querySelector("input[type='text']");
const currentLocationBtn = document.querySelector("button");
const cityName = document.querySelector("h2");
const temperature = document.querySelector(".text-4xl");
const feelsLike = document.querySelector("#feels-like");
const weatherDescription = document.querySelector(".text-lg");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const currentTime = document.querySelector("#current-time");
const currentDate = document.querySelector("#current-date");
const forecastContainer = document.querySelector("#day-forecast");
const hourlyForecastContainer = document.querySelector(".grid-cols-5.gap-4.mt-3.text-center");
const wishItem = document.getElementById("#wish-item")

// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("search-btn").addEventListener("click", searchFunction);
// });

document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener to the search button
    const searchButton = document.getElementById("search-btn");
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const city = searchInput.value.trim();
            if (city) {
                fetchWeather(city);
            } else {
                alert("Please enter a city name before searching.");
            }
        });
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.name) {
        const username = user.name;
        const firstLetter = user.name.charAt(0).toUpperCase();
        document.getElementById("multiLevelDropdownButton").innerText = firstLetter;
        document.getElementById("userName").innerText = username
    } else {
        alert("User not logged in");
        window.location.href = "signin.html";
    }
});



// Function to remove a city from favorites and update JSON Server
async function removeFavorite(city, index) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.favorites) {
        // Remove city from localStorage
        user.favorites.splice(index, 1);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // Send a PATCH request to update the user's favorite list in the JSON server
        try {
            const response = await fetch(`http://localhost:3002/users/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorites: user.favorites })
            });
            if (!response.ok) {
                throw new Error("Failed to update favorites on server");
            }
            // Refresh the dropdown after successful server update
            document.dispatchEvent(new Event("DOMContentLoaded"));
        } catch (error) {
            console.error("Error updating favorites:", error);
            alert("Failed to update server. Please try again.");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const dropdown = document.getElementById("dropdownHover");
    dropdown.innerHTML = "";

    if (user && user.favorites && user.favorites.length > 0) {
        user.favorites.forEach((city, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add(
                "flex", "justify-between", "items-center", "px-4", "py-2",
                "hover:bg-gray-100", "dark:hover:bg-gray-600", "dark:hover:text-white",
                "cursor-pointer"
            );

            listItem.innerHTML = `
                <span>${city}</span>
                <button class="text-red-500 hover:text-red-700" onclick="removeFavorite('${city}', ${index})">🗑️</button>
            `;

            // Add event listener to fetch weather when clicked
            listItem.addEventListener("click", function () {
                fetchWeather(city);
            });

            dropdown.appendChild(listItem);
        });
    } else {
        dropdown.innerHTML = "<li class='px-4 py-2 text-gray-500 text-center'>No favorites added</li>";
    }
});



// Fetch Weather Data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}${city}?unitGroup=metric&key=${API_KEY}&contentType=json`);
        console.log(response);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateUI(data);
        updateWeeklyForecast(data.days);
        if (data.days[0]?.hours) {
            updateHourlyForecast(data.days[0].hours);
        } else {
            console.error("No hourly data available!");
            hourlyForecastContainer.innerHTML = "<p>No hourly forecast available.</p>";
        }
    } catch (error) {
        console.error(error);
    }
}

function updateUI(data) {
    console.log("Updating UI with data:", data);
    if (!data.currentConditions) {
        console.error("No current conditions available!");
        return;
    }
    if (cityName) cityName.textContent = data.address || "Unknown Location";
    // if (currentTime) currentTime.textContent = `${data.currentConditions.datetime}`;
    if (temperature) temperature.textContent = `${Math.round(data.currentConditions.temp)}°C`;
    if (feelsLike) feelsLike.textContent = `Feels like: ${data.currentConditions.feelslike}°C`;
    if (weatherDescription) weatherDescription.textContent = data.currentConditions.conditions;
    if (humidity) humidity.textContent = `💧 Humidity: ${data.currentConditions.humidity}%`;
    if (windSpeed) windSpeed.textContent = `💨 Wind Speed: ${data.currentConditions.windspeed} km/h`;
    if (sunrise) sunrise.textContent = `🌅 Sunrise: ${data.days[0]?.sunrise || "N/A"}`;
    if (sunset) sunset.textContent = `🌇 Sunset: ${data.days[0]?.sunset || "N/A"}`;
    if (currentTime && currentDate) {
        // Format time (Remove seconds)
        currentTime.textContent = data.currentConditions.datetime.split(":").slice(0, 2).join(":"); 
        // Convert API date (YYYY-MM-DD) to a readable format
        const rawDate = new Date(data.days[0].datetime); 
        currentDate.textContent = rawDate.toLocaleDateString("en-US", {
            weekday: "long",  
            day: "numeric",   
            month: "short",  
            year: "numeric"
        });
    }
}

function convertDate(dateString) {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
}

// Update Weekly Forecast
function updateWeeklyForecast(days) {
    console.log("Weekly Forecast Data:", days);
    if (!days || days.length === 0) {
        forecastContainer.innerHTML = "<p>No forecast data available.</p>";
        return;
    }
    forecastContainer.innerHTML = "";
    days.slice(1, 6).forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-day");
        dayElement.innerHTML = `
            <p><strong>${convertDate(day.datetime)}</strong></p>
            <p>🌡️ ${Math.round(day.temp)}°C</p>
            <p>☁️ ${day.conditions}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

function updateHourlyForecast(hours) {
    hourlyForecastContainer.innerHTML = "";
    if (!hours || hours.length === 0) {
        console.error("No hourly forecast data available.");
        hourlyForecastContainer.innerHTML = "<p>No hourly forecast available.</p>";
        return;
    }
    const nowEpoch = Math.floor(Date.now() / 1000);
    const futureHours = hours.filter(hour => hour.datetimeEpoch > nowEpoch);
    if (futureHours.length === 0) {
        hourlyForecastContainer.innerHTML = "<p>No upcoming hourly forecast available.</p>";
        return;
    }
    // Show next 5 hours only
    futureHours.slice(0, 5).forEach(hour => {
        const hourElement = document.createElement("div");
        hourElement.classList.add("p-4", "rounded-lg");
        // Time Formatting (Remove Seconds)
        const formattedTime = hour.datetime.split(":").slice(0, 2).join(":");
        hourElement.innerHTML = `
            <p class="font-bold">${formattedTime}</p>
            <p>🌡️ ${Math.round(hour.temp)}°C</p>
            <p class="text-xs text-gray-600">💨 ${hour.windspeed} km/h</p>
        `;
        hourlyForecastContainer.appendChild(hourElement);
    });
}

// Get Background Color Based on Time
function getHourColor(hourString) {
    const hour = parseInt(hourString.substring(0, 2), 10);
    if (hour >= 6 && hour < 12) return "bg-yellow-200";
    if (hour >= 12 && hour < 18) return "bg-orange-200";
    if (hour >= 18 && hour < 21) return "bg-blue-200";
    return "bg-indigo-300";
}

document.getElementById("log-out").addEventListener("click", async function () {
    try {
        //Get the logged-in user ID from local storage
        const userName = localStorage.getItem("name");
        //If user ID exists, remove the user session from JSON Server
        if (userName) {
            const response = await fetch(`http://localhost:3002/${name}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("Failed to remove session from server");
            }
        }
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        sessionStorage.clear();
        window.location.href = "signin.html"; 
    } catch (error) {
        console.error("Logout failed:", error);
        alert("Error logging out. Please try again.");
    }
});


const addToFavoritesBtn = document.querySelector("#whitelist");
addToFavoritesBtn?.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (!city) {
        alert("Please enter a city name before adding to favorites.");
        return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || !user.id) {
        alert("User not logged in.");
        return;
    }
    try {
        // Fetch the user's latest data
        const response = await fetch(`http://localhost:3002/users/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        // Ensure favorites is an array
        userData.favorites = userData.favorites || [];
        // Check if the city is already in favorites
        if (userData.favorites.includes(city)) {
            alert(`${city} is already in your favorites!`);
            return;
        }
        // Add new city to the favorites list
        userData.favorites.push(city);
        // Update user data in the API
        const updateResponse = await fetch(`http://localhost:3002/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ favorites: userData.favorites })
        });
        if (!updateResponse.ok) throw new Error("Failed to update favorites");

        // Update localStorage with new user data
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        alert(`${city} added to favorites!`);
    } catch (error) {
        console.error("Error adding favorite:", error);
        alert("Could not add favorite. Please try again.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("dropdownHoverButton");
    const dropdown = document.getElementById("dropdownHover");

    // Toggle dropdown visibility on button click
    dropdownButton.addEventListener("click", (event) => {
        event.stopPropagation(); 
        dropdown.classList.toggle("hidden");
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target) && !dropdownButton.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
});

// Event Listeners
searchInput?.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
        fetchWeather(searchInput.value.trim());
    }
});
// Default Weather on Page Load
// fetchWeather("Kendrapara");


document.addEventListener("DOMContentLoaded", function () {
    getCurrentLocationWeather(); 
});

// Function to get weather for the current location
document.addEventListener("DOMContentLoaded", function () {
    getCurrentLocationWeather();
});

// Function to get weather for the current location
// Function to get location name from coordinates
async function getLocationName(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        if (!response.ok) throw new Error("Failed to get location name");

        const data = await response.json();
        console.log("Resolved Location:", data);

        // Extract city or town name (fallback to display name if unavailable)
        return data.address.city || data.address.town || data.address.village || data.address.county || data.display_name;
    } catch (error) {
        console.error("Error fetching location name:", error);
        return "Unknown Location";
    }
}

// Function to get weather based on current location
function getCurrentLocationWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`Latitude: ${lat}, Longitude: ${lon}`);

                // Get the location name
                const cityName = await getLocationName(lat, lon);
                console.log(`Detected City: ${cityName}`);

                // Fetch weather using the resolved city name
                fetchWeather(cityName);
            },
            (error) => {
                console.warn("Location access denied. Using default location.");
                alert("Location access denied! Showing weather for default city (Kendrapara).");

                // ❗ Fallback: Show weather for a default location
                fetchWeather("Kendrapara");
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        alert("Your browser does not support location services. Using default city.");

        fetchWeather("Kendrapara");
    }
}



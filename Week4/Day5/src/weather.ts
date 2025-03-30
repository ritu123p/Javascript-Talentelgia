const API_KEY = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// Select Elements
const searchInput = document.querySelector<HTMLInputElement>("input[type='text']");
const currentLocationBtn = document.querySelector<HTMLButtonElement>("button");
const cityName = document.querySelector<HTMLHeadingElement>("h2");
const temperature = document.querySelector<HTMLHeadingElement>(".text-4xl");
const weatherDescription = document.querySelector<HTMLParagraphElement>(".text-lg");
const humidity = document.querySelector<HTMLParagraphElement>("#humidity");
const windSpeed = document.querySelector<HTMLParagraphElement>("#wind-speed");
const sunrise = document.querySelector<HTMLParagraphElement>("#sunrise");
const sunset = document.querySelector<HTMLParagraphElement>("#sunset");

// Convert UNIX timestamp to readable time
function convertTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Fetch weather data from OpenWeather API
async function fetchWeather(city: string) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error(error);
        alert("City not found. Please try again!");
    }
}

// Update UI with fetched weather data
function updateUI(data: any) {
    if (cityName) cityName.textContent = data.name;
    if (temperature) temperature.textContent = `${Math.round(data.main.temp)}°C`;
    if (weatherDescription) weatherDescription.textContent = data.weather[0].description;
    if (humidity) humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    if (windSpeed) windSpeed.textContent = `💨 Wind Speed: ${data.wind.speed} km/h`;
    if (sunrise) sunrise.textContent = `🌅 Sunrise: ${convertTime(data.sys.sunrise)}`;
    if (sunset) sunset.textContent = `🌇 Sunset: ${convertTime(data.sys.sunset)}`;
}

// Fetch weather for user's current location
function getCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                );

                if (!response.ok) throw new Error("Unable to fetch location data");

                const data = await response.json();
                updateUI(data);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch weather for your location.");
            }
        },
        (error) => {
            console.error(error);
            alert("Location access denied. Please enter a city manually.");
        }
    );
}

// Event Listeners
searchInput?.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
        fetchWeather(searchInput.value.trim());
    }
});

currentLocationBtn?.addEventListener("click", getCurrentLocationWeather);

// Default Weather for a City on Page Load
fetchWeather("New York"); // You can change this to any default city

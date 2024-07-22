const getWeatherButton = document.getElementById("get-weather-btn");
const cityNameInput = document.getElementById("city-name-input");
const weatherDescriptionContainer = document.getElementById("weather-description");
const weatherIconContainer = document.getElementById("weather-icon");
const temperatureContainer = document.getElementById("temperature");
const windSpeedContainer = document.getElementById("wind-speed");

const apiKey = "92c8af421df3c1565a21d31c8ac69a05";

async function getCurrentWeather(city) {
    try {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.search = new URLSearchParams({
            q: city,
            appid: apiKey,
            units: "metric",
        }).toString();
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка. Попробуйте снова позже.");
        return null; // Исправление: возвращаем null при ошибке
    }
}

function extractWeatherData(response) {
    if (!response.weather) {
        return {
            temperature: 'N/A',
            weatherDescription: 'N/A',
            weatherIconUrl: 'N/A',
            windSpeed: 'N/A',
        };
    }
    const temperature = response.main.temp;
    const weatherDescription = response.weather[0].description;
    const weatherIcon = response.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    const windSpeed = response.wind.speed;
    return {
        temperature,
        weatherDescription,
        weatherIconUrl,
        windSpeed,
    }
}

function displayWeather(weatherData) {
    const { temperature, weatherDescription, weatherIconUrl, windSpeed } = weatherData;
    // Заменим с базового английского на русский :)

    
    weatherDescriptionContainer.textContent = "Погода: " + weatherDescription;
    weatherIconContainer.src = weatherIconUrl;
    temperatureContainer.textContent = "Температура: " + temperature + "°C"; 
    windSpeedContainer.textContent = "Скорость ветра: " + windSpeed + "м/c";
}

getWeatherButton.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const city = cityNameInput.value;
    if (!city) return alert("Пожалуйста, введите название города");
    const response = await getCurrentWeather(city);
    const weatherData = extractWeatherData(response);
    displayWeather(weatherData);
    cityNameInput.value = "";
});
